import { loadChatwoot } from "@/lib/chatwoot";
import { disableMatomoTracking, loadMatomo } from "@/lib/matomo";

type CookieConsentApi = typeof import("vanilla-cookieconsent");

export const COOKIE_CONSENT_UPDATED_EVENT = "mikuva:cookie-consent-updated";

let cookieConsentApi: CookieConsentApi | undefined;
let cookieConsentRunPromise: Promise<void> | undefined;

function notifyConsentUpdated() {
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_UPDATED_EVENT));
}

function syncOptionalServices(api: CookieConsentApi) {
  if (api.acceptedService("chatwoot", "functional")) {
    void loadChatwoot();
  }

  if (api.acceptedService("matomo", "analytics")) {
    void loadMatomo();
  } else {
    disableMatomoTracking();
  }

  notifyConsentUpdated();
}

function createConsentConfig(api: CookieConsentApi): CookieConsent.CookieConsentConfig {
  return {
    mode: "opt-in",
    revision: 2,
    autoShow: true,
    autoClearCookies: true,
    disablePageInteraction: false,
    hideFromBots: true,
    lazyHtmlGeneration: true,
    cookie: {
      name: "mikuva_cookie_consent",
      path: "/",
      sameSite: "Lax",
      secure: window.location.protocol === "https:",
      expiresAfterDays: 182,
    },
    guiOptions: {
      consentModal: {
        layout: "box wide",
        position: "bottom left",
        equalWeightButtons: true,
      },
      preferencesModal: {
        layout: "bar wide",
        position: "left",
        equalWeightButtons: true,
      },
    },
    categories: {
      necessary: {
        enabled: true,
        readOnly: true,
      },
      functional: {
        services: {
          chatwoot: {
            label: "Chatwoot — Chat de atención",
            cookies: [{ name: "cw_conversation" }, { name: /^cw_user_/ }],
            onAccept: () => void loadChatwoot(),
            onReject: notifyConsentUpdated,
          },
          "google-maps": {
            label: "Google Maps — Mapa de ubicación",
          },
        },
      },
      analytics: {
        services: {
          matomo: {
            label: "Matomo — Medición de uso",
            cookies: [{ name: /^_pk_/ }],
            onAccept: () => void loadMatomo(),
            onReject: disableMatomoTracking,
          },
        },
      },
    },
    language: {
      default: "es-MX",
      translations: {
        "es-MX": {
          consentModal: {
            label: "Preferencias de privacidad",
            title: "Tu privacidad, con claridad",
            description:
              "Usamos cookies necesarias para que Mikuva funcione correctamente. Tú decides si permites funciones opcionales como el chat, el mapa y la medición de visitas.",
            acceptNecessaryBtn: "Rechazar opcionales",
            showPreferencesBtn: "Configurar",
            acceptAllBtn: "Aceptar todas",
            footer: '<a href="/aviso-de-privacidad">Consulta el aviso de privacidad y cookies</a>',
          },
          preferencesModal: {
            title: "Preferencias de privacidad",
            closeIconLabel: "Cerrar preferencias",
            acceptNecessaryBtn: "Rechazar opcionales",
            acceptAllBtn: "Aceptar todas",
            savePreferencesBtn: "Guardar preferencias",
            serviceCounterLabel: "servicio|servicios",
            sections: [
              {
                description:
                  "Usamos cookies necesarias para que Mikuva funcione correctamente. Puedes decidir si permites el chat, el mapa de ubicación y la medición de visitas.",
              },
              {
                title: 'Cookies necesarias <span class="pm__badge">Siempre activas</span>',
                description:
                  "Son necesarias para el funcionamiento y la seguridad del sitio y para recordar tus preferencias de privacidad.",
                linkedCategory: "necessary",
                cookieTable: {
                  headers: {
                    name: "Cookie",
                    description: "Finalidad",
                  },
                  body: [
                    {
                      name: "mikuva_cookie_consent",
                      description: "Guarda tus categorías y servicios elegidos.",
                    },
                  ],
                },
              },
              {
                title: "Chat, mapa y funciones opcionales",
                description:
                  "Permiten habilitar el chat de atención y mostrar el mapa de Google en la página de contacto. Cada servicio puede elegirse por separado.",
                linkedCategory: "functional",
                cookieTable: {
                  headers: {
                    name: "Cookie",
                    description: "Finalidad",
                  },
                  body: [
                    {
                      name: "cw_conversation",
                      description: "Mantiene la conversación del widget de Chatwoot.",
                    },
                    {
                      name: "cw_user_{identifier}",
                      description:
                        "Puede existir si se usa setUser del SDK. Mikuva no usa setUser actualmente.",
                    },
                  ],
                },
              },
              {
                title: "Medición del sitio",
                description:
                  "Permite conocer qué páginas se visitan y cómo se usa el sitio para poder mejorarlo.",
                linkedCategory: "analytics",
                cookieTable: {
                  headers: {
                    name: "Cookie",
                    description: "Finalidad",
                  },
                  body: [
                    {
                      name: "_pk_id.<sitio>.<dominio>",
                      description: "Distingue una visita recurrente en Matomo.",
                    },
                    {
                      name: "_pk_ses.<sitio>.<dominio>",
                      description: "Conserva temporalmente los datos de la sesión de medición.",
                    },
                  ],
                },
              },
              {
                title: "Información legal",
                description:
                  '<a href="/aviso-de-privacidad">Consulta el aviso de privacidad y cookies</a>',
              },
            ],
          },
        },
      },
    },
    onFirstConsent: () => syncOptionalServices(api),
    onConsent: () => syncOptionalServices(api),
    onChange: () => syncOptionalServices(api),
  };
}

export function initializeCookieConsent(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (cookieConsentRunPromise) return cookieConsentRunPromise;

  cookieConsentRunPromise = import("vanilla-cookieconsent").then(async (api) => {
    cookieConsentApi = api;
    await api.run(createConsentConfig(api));
    notifyConsentUpdated();
  });

  return cookieConsentRunPromise;
}

export function hasCookieConsent(): boolean {
  return cookieConsentApi?.validConsent() ?? false;
}

export function hasAnalyticsConsent(): boolean {
  return cookieConsentApi?.acceptedService("matomo", "analytics") ?? false;
}

export function hasGoogleMapsConsent(): boolean {
  return cookieConsentApi?.acceptedService("google-maps", "functional") ?? false;
}

export async function acceptGoogleMapsConsent(): Promise<void> {
  await initializeCookieConsent();
  cookieConsentApi?.acceptService("google-maps", "functional");
  notifyConsentUpdated();
}

export function showCookiePreferences() {
  if (cookieConsentApi) {
    cookieConsentApi.showPreferences();
    return;
  }

  void initializeCookieConsent().then(() => cookieConsentApi?.showPreferences());
}
