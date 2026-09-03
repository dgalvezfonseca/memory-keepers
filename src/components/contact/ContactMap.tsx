import { ExternalLink, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  acceptGoogleMapsConsent,
  COOKIE_CONSENT_UPDATED_EVENT,
  hasGoogleMapsConsent,
  initializeCookieConsent,
} from "@/lib/cookie-consent";

const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3758.0321616427404!2d-99.23422207516661!3d19.62592273497881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d21e8f7b0e10a9%3A0x1bc6c2a93c98144a!2sArguz%20Digitalizaci%C3%B3n%2C%20S.A.%20de%20C.V.!5e0!3m2!1ses-419!2smx!4v1775509803530!5m2!1ses-419!2smx";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Arguz%20Digitalizaci%C3%B3n%2C%20S.A.%20de%20C.V.";

export default function ContactMap() {
  const [canLoadMap, setCanLoadMap] = useState(false);
  const [isEnabling, setIsEnabling] = useState(false);

  useEffect(() => {
    const updateConsent = () => setCanLoadMap(hasGoogleMapsConsent());

    window.addEventListener(COOKIE_CONSENT_UPDATED_EVENT, updateConsent);
    void initializeCookieConsent().then(updateConsent);

    return () => window.removeEventListener(COOKIE_CONSENT_UPDATED_EVENT, updateConsent);
  }, []);

  async function enableMap() {
    setIsEnabling(true);

    try {
      await acceptGoogleMapsConsent();
      setCanLoadMap(hasGoogleMapsConsent());
    } finally {
      setIsEnabling(false);
    }
  }

  if (canLoadMap) {
    return (
      <div className="overflow-hidden rounded-md border border-background/20 bg-background">
        <iframe
          src={GOOGLE_MAPS_EMBED_URL}
          title="Ubicación de Mikuva en Google Maps"
          className="h-72 w-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-72 flex-col items-start justify-between rounded-md border border-background/20 bg-background/5 p-5 sm:p-6">
      <MapPin className="h-7 w-7 text-primary" aria-hidden />
      <div className="mt-8">
        <p className="font-semibold text-background">Consulta la ubicación en el mapa</p>
        <p className="mt-2 text-sm leading-relaxed text-background/70">
          Google Maps se cargará únicamente si lo permites como función opcional.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            type="button"
            variant="secondary"
            className="min-h-11 rounded-md"
            disabled={isEnabling}
            onClick={() => void enableMap()}
          >
            {isEnabling ? "Cargando…" : "Mostrar mapa"}
          </Button>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-background underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Abrir en Google Maps
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
}
