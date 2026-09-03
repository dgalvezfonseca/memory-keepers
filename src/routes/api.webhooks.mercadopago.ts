import { createFileRoute } from "@tanstack/react-router";

import { handleMercadoPagoWebhook } from "@/lib/mercadopago-webhook.server";

export const Route = createFileRoute("/api/webhooks/mercadopago")({
  server: {
    handlers: {
      POST: ({ request }) => handleMercadoPagoWebhook(request),
      ANY: () =>
        Response.json(
          { received: false, error: "Method not allowed." },
          { status: 405, headers: { Allow: "POST" } },
        ),
    },
  },
});
