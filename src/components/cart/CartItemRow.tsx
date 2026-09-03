import { Minus, Plus, Trash2 } from "lucide-react";

import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format";
import type { CartItem } from "@/types/catalog";

export default function CartItemRow({
  item,
  compact = false,
}: {
  item: CartItem;
  compact?: boolean;
}) {
  const { updateQuantity, removeItem } = useCart();

  if (compact) {
    return (
      <article className="grid grid-cols-[4rem_minmax(0,1fr)] gap-x-3 border-b border-border py-4">
        <img src={item.image} alt="" className="aspect-square w-16 rounded-md object-cover" />
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h2 className="min-w-0 text-sm font-semibold leading-5">{item.name}</h2>
            <p className="shrink-0 text-sm font-semibold tabular-nums">
              {formatPrice(item.unitPrice * item.quantity)}
            </p>
          </div>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
            {item.config.summary}
          </p>
          <div className="mt-2 flex min-w-0 items-center gap-1">
            <button
              type="button"
              aria-label={`Disminuir cantidad de ${item.name}`}
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="min-w-6 text-center text-sm font-semibold tabular-nums">
              {item.quantity}
            </span>
            <button
              type="button"
              aria-label={`Aumentar cantidad de ${item.name}`}
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              aria-label={`Eliminar ${item.name} del carrito`}
              onClick={() => removeItem(item.id)}
              className="ml-auto inline-flex min-h-11 min-w-0 items-center gap-1 px-1 text-xs text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span className="hidden min-[360px]:inline">Eliminar</span>
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="grid grid-cols-[88px_1fr] gap-4 border-b border-border py-5 sm:grid-cols-[112px_1fr_auto]">
      <img src={item.image} alt="" className="aspect-square w-full rounded-lg object-cover" />
      <div className="min-w-0">
        <h2 className="font-serif text-xl">{item.name}</h2>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.config.summary}</p>
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            aria-label={`Disminuir cantidad de ${item.name}`}
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="min-w-5 text-center text-sm font-semibold">{item.quantity}</span>
          <button
            type="button"
            aria-label={`Aumentar cantidad de ${item.name}`}
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="ml-1 inline-flex min-h-11 items-center gap-1 px-1 text-xs text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden /> Eliminar
          </button>
        </div>
      </div>
      <p className="col-start-2 font-semibold sm:col-start-3 sm:row-start-1">
        {formatPrice(item.unitPrice * item.quantity)}
      </p>
    </article>
  );
}
