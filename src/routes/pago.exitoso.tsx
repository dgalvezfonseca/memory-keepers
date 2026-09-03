import { createFileRoute } from "@tanstack/react-router";

import PaymentReturnPage from "@/components/payments/PaymentReturnPage";
import { routeMeta } from "@/lib/seo";

export const Route = createFileRoute("/pago/exitoso")({
  head: () => ({
    meta: [
      ...routeMeta("Pago en verificación", "Estamos verificando tu regreso desde Mercado Pago."),
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: PaymentSuccessPage,
});

function PaymentSuccessPage() {
  return (
    <PaymentReturnPage
      eyebrow="Regreso desde Mercado Pago"
      title="Estamos verificando el pago."
      description="Recibimos tu regreso desde Mercado Pago. Tu solicitud permanece en verificación; todavía no la marcamos como pagada ni confirmada."
      actionLabel="Volver a la tienda"
      actionTo="/tienda"
    />
  );
}
