import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { COOKIE_CONSENT_UPDATED_EVENT, hasAnalyticsConsent } from "@/lib/cookie-consent";
import { trackMatomoPageView } from "@/lib/matomo";

export default function MatomoTracker() {
  const href = useRouterState({ select: (state) => state.location.href });
  const lastTrackedUrl = useRef<string | undefined>(undefined);

  useEffect(() => {
    const trackCurrentRoute = () => {
      if (!hasAnalyticsConsent()) {
        lastTrackedUrl.current = undefined;
        return;
      }

      const routeUrl = new URL(href, window.location.origin);
      // Payment providers append identifiers to return URLs. Analytics only
      // needs the route, never payment-related query strings or fragments.
      const absoluteUrl = `${routeUrl.origin}${routeUrl.pathname}`;
      if (lastTrackedUrl.current === absoluteUrl) return;

      lastTrackedUrl.current = absoluteUrl;
      void trackMatomoPageView(absoluteUrl, document.title);
    };

    window.addEventListener(COOKIE_CONSENT_UPDATED_EVENT, trackCurrentRoute);
    trackCurrentRoute();

    return () => window.removeEventListener(COOKIE_CONSENT_UPDATED_EVENT, trackCurrentRoute);
  }, [href]);

  return null;
}
