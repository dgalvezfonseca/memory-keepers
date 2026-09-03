import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

interface PaymentReturnPageProps {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel: string;
  actionTo: "/checkout" | "/tienda";
}

export default function PaymentReturnPage({
  eyebrow,
  title,
  description,
  actionLabel,
  actionTo,
}: PaymentReturnPageProps) {
  return (
    <main className="mx-auto flex min-h-[65vh] max-w-4xl items-center px-5 py-16 lg:px-8">
      <div className="w-full border-l-2 border-primary pl-6 sm:pl-10">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display mt-4 max-w-3xl text-4xl sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
        <p className="mt-8 max-w-2xl border-t border-border pt-5 text-sm leading-relaxed">
          Volver desde Mercado Pago no confirma por sí mismo el estado del pago. La confirmación se
          verifica de forma segura con Mercado Pago antes de actualizar tu pedido.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="min-h-11 rounded-full">
            <Link to={actionTo}>{actionLabel}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-h-11 rounded-full">
            <Link to="/contacto">Contactar a Mikuva</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
