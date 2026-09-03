const MATOMO_BASE_URL = "https://arguz.com/matomo/";
const MATOMO_SITE_ID = "3";
const MATOMO_SCRIPT_ID = "mikuva-matomo-tracker";

type MatomoCommand = [string, ...unknown[]];

declare global {
  interface Window {
    _paq?: MatomoCommand[];
  }
}

let matomoLoadPromise: Promise<boolean> | undefined;
let matomoConfigured = false;
let linkTrackingEnabled = false;

function getMatomoQueue(): MatomoCommand[] {
  return (window._paq = window._paq ?? []);
}

function configureMatomo() {
  const queue = getMatomoQueue();

  if (!matomoConfigured) {
    queue.push(["setTrackerUrl", `${MATOMO_BASE_URL}matomo.php`]);
    queue.push(["setSiteId", MATOMO_SITE_ID]);
    matomoConfigured = true;
  }

  if (!linkTrackingEnabled) {
    queue.push(["enableLinkTracking"]);
    linkTrackingEnabled = true;
  }
}

/** Loads Matomo only after analytics consent. Repeated calls share one script. */
export function loadMatomo(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);

  configureMatomo();

  const existingScript = document.getElementById(MATOMO_SCRIPT_ID) as HTMLScriptElement | null;
  if (existingScript?.dataset["loaded"] === "true") return Promise.resolve(true);
  if (matomoLoadPromise) return matomoLoadPromise;

  matomoLoadPromise = new Promise<boolean>((resolve) => {
    const script = existingScript ?? document.createElement("script");

    const handleLoad = () => {
      script.dataset["loaded"] = "true";
      resolve(true);
    };
    const handleError = () => {
      console.warn("La medición de uso no pudo cargarse.");
      if (!existingScript) script.remove();
      matomoLoadPromise = undefined;
      resolve(false);
    };

    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });

    if (!existingScript) {
      script.id = MATOMO_SCRIPT_ID;
      script.src = `${MATOMO_BASE_URL}matomo.js`;
      script.async = true;
      document.head.appendChild(script);
    }
  });

  return matomoLoadPromise;
}

export async function trackMatomoPageView(url: string, title: string): Promise<boolean> {
  if (typeof window === "undefined") return false;

  const loaded = await loadMatomo();
  if (!loaded) return false;

  const queue = getMatomoQueue();
  queue.push(["setCustomUrl", url]);
  queue.push(["setDocumentTitle", title]);
  queue.push(["trackPageView"]);
  return true;
}

/** Stops new tracking after revocation without attempting to tear down the SDK. */
export function disableMatomoTracking() {
  if (typeof window === "undefined" || !window._paq) return;

  window._paq.push(["disableLinkTracking"]);
  window._paq.push(["deleteCookies"]);
  linkTrackingEnabled = false;
}
