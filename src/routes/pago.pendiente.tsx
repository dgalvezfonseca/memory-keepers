import { createFileRoute } from "@tanstack/react-router";

import PaymentReturnPage from "@/components/payments/PaymentReturnPage";
import { routeMeta } from "@/lib/seo";

export const Route = createFileRoute("/pago/pendiente")({
  head: () => ({
    meta: [
      ...routeMeta("Pago pendiente", "Tu operación en Mercado Pago continúa pendiente."),
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: PaymentPendingPage,
});

function PaymentPendingPage() {
  return (
    <PaymentReturnPage
      eyebrow="Pago pendiente"
      title="La operación aún no termina."
      description="Mercado Pago indicó que la operación continúa pendiente. No marcaremos tu solicitud como pagada hasta recibir una confirmación verificable del servidor."
      actionLabel="Volver a la tienda"
      actionTo="/tienda"
    />
  );
}
