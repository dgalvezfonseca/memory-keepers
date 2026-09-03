const CHATWOOT_BASE_URL = "https://chat.arguz.net";
const CHATWOOT_WEBSITE_TOKEN = "9Pv59gDGpRHtJUKSdm5QntSi";
const CHATWOOT_SCRIPT_ID = "mikuva-chatwoot-sdk";
const CHATWOOT_INITIALIZED_ATTRIBUTE = "data-mikuva-chatwoot-initialized";

type ChatwootSdk = {
  run: (config: { baseUrl: string; websiteToken: string }) => void;
};

type ChatwootWidget = {
  toggleBubbleVisibility?: (visibility: "show" | "hide") => void;
};

declare global {
  interface Window {
    chatwootSDK?: ChatwootSdk;
    chatwootSettings?: {
      launcherTitle: string;
      position: "right";
      type: "standard";
    };
    $chatwoot?: ChatwootWidget;
  }
}

let chatwootLoadPromise: Promise<boolean> | undefined;

/** Uses Chatwoot's public widget API without reaching into its iframe or DOM. */
export function setChatwootLauncherVisibility(visible: boolean): boolean {
  if (typeof window === "undefined" || !window.$chatwoot?.toggleBubbleVisibility) return false;

  try {
    window.$chatwoot.toggleBubbleVisibility(visible ? "show" : "hide");
    return true;
  } catch {
    return false;
  }
}

function initializeChatwoot(): boolean {
  if (typeof window === "undefined" || !window.chatwootSDK) return false;

  const root = document.documentElement;
  if (root.getAttribute(CHATWOOT_INITIALIZED_ATTRIBUTE) === "true") return true;

  window.chatwootSettings = {
    position: "right",
    type: "standard",
    launcherTitle: "",
  };

  window.chatwootSDK.run({
    websiteToken: CHATWOOT_WEBSITE_TOKEN,
    baseUrl: CHATWOOT_BASE_URL,
  });
  root.setAttribute(CHATWOOT_INITIALIZED_ATTRIBUTE, "true");

  return true;
}

/**
 * Loads the public Chatwoot website SDK after functional-cookie consent.
 * The DOM id, initialization marker and shared promise prevent duplicate work,
 * including during React development remounts or repeated consent callbacks.
 */
export function loadChatwoot(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (initializeChatwoot()) return Promise.resolve(true);
  if (chatwootLoadPromise) return chatwootLoadPromise;

  chatwootLoadPromise = new Promise<boolean>((resolve) => {
    const existingScript = document.getElementById(CHATWOOT_SCRIPT_ID) as HTMLScriptElement | null;
    const script = existingScript ?? document.createElement("script");

    const handleLoad = () => resolve(initializeChatwoot());
    const handleError = () => {
      console.warn("El chat de atención no pudo cargarse.");
      if (!existingScript) script.remove();
      chatwootLoadPromise = undefined;
      resolve(false);
    };

    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });

    if (!existingScript) {
      window.chatwootSettings = {
        position: "right",
        type: "standard",
        launcherTitle: "",
      };
      script.id = CHATWOOT_SCRIPT_ID;
      script.src = `${CHATWOOT_BASE_URL}/packs/js/sdk.js`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  });

  return chatwootLoadPromise;
}
