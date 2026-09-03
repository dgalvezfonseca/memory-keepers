import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

import {
  COOKIE_CONSENT_UPDATED_EVENT,
  hasCookieConsent,
  initializeCookieConsent,
  showCookiePreferences,
} from "@/lib/cookie-consent";

export default function CookieConsentManager() {
  const [showPreferencesButton, setShowPreferencesButton] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setShowPreferencesButton(hasCookieConsent());

    window.addEventListener(COOKIE_CONSENT_UPDATED_EVENT, updateVisibility);
    void initializeCookieConsent().then(updateVisibility);

    return () => window.removeEventListener(COOKIE_CONSENT_UPDATED_EVENT, updateVisibility);
  }, []);

  if (!showPreferencesButton) return null;

  return (
    <button
      type="button"
      onClick={showCookiePreferences}
      aria-label="Configurar cookies"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] z-40 inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md border border-foreground/25 bg-ivory px-3 text-xs font-semibold text-foreground shadow-sm transition-colors hover:border-foreground/45 hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <SlidersHorizontal className="h-4 w-4 text-primary" aria-hidden />
      <span className="hidden sm:inline">Privacidad</span>
    </button>
  );
}
