import { Check, Circle } from "lucide-react";

import type { OrderStatus } from "@/types/catalog";

const ORDER_STEPS: Array<{ status: OrderStatus; label: string }> = [
  { status: "recibido", label: "Pedido recibido" },
  { status: "esperando_material", label: "Esperando material" },
  { status: "material_recibido", label: "Material recibido" },
  { status: "digitalizacion", label: "En digitalización" },
  { status: "control_calidad", label: "Control de calidad" },
  { status: "preparando_entrega", label: "Preparando entrega" },
  { status: "enviado", label: "Enviado" },
  { status: "entregado", label: "Entregado" },
];

export default function OrderTimeline({ currentStatus }: { currentStatus: OrderStatus }) {
  const current = ORDER_STEPS.findIndex((step) => step.status === currentStatus);
  return (
    <ol aria-label="Estado del pedido" className="mt-7">
      {ORDER_STEPS.map((step, index) => {
        const complete = index < current;
        const active = index === current;
        return (
          <li key={step.status} className="relative flex gap-4 pb-7 last:pb-0">
            {index < ORDER_STEPS.length - 1 && (
              <span
                className={`absolute left-[13px] top-7 h-full w-px ${complete ? "bg-primary" : "bg-border"}`}
                aria-hidden
              />
            )}
            <span
              className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${complete || active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"}`}
            >
              {complete ? (
                <Check className="h-4 w-4" aria-hidden />
              ) : (
                <Circle className="h-2 w-2 fill-current" aria-hidden />
              )}
            </span>
            <div>
              <p className={`text-sm font-medium ${active ? "text-primary" : ""}`}>{step.label}</p>
              {active && (
                <p className="mt-1 text-xs text-muted-foreground">Estado actual del ejemplo</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
