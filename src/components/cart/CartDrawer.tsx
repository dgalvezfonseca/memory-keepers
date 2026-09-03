import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

import CartItemRow from "@/components/cart/CartItemRow";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import { setChatwootLauncherVisibility } from "@/lib/chatwoot";
import { formatPrice } from "@/lib/format";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, count, subtotal } = useCart();

  useEffect(() => {
    const syncLauncher = () => setChatwootLauncherVisibility(!open);

    syncLauncher();
    if (open) window.addEventListener("chatwoot:ready", syncLauncher);

    return () => {
      window.removeEventListener("chatwoot:ready", syncLauncher);
      if (open) setChatwootLauncherVisibility(true);
    };
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={`Carrito, ${count} artículos`}
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground transition-colors hover:bg-secondary"
        >
          <ShoppingBag className="h-5 w-5" aria-hidden />
          {count > 0 && (
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
              {count}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex h-dvh max-h-dvh w-full max-w-md flex-col gap-0 overflow-hidden bg-ivory p-0 sm:max-w-md"
      >
        <header className="shrink-0 border-b border-border px-4 pb-4 pt-4 pr-16 sm:px-5 sm:pb-5 sm:pt-5 sm:pr-16">
          <SheetTitle className="font-serif text-2xl leading-tight">Tu carrito</SheetTitle>
          <SheetDescription className="mt-1 leading-5">
            {count
              ? `${count} ${count === 1 ? "servicio" : "servicios"} para preservar`
              : "Listo para recibir tus recuerdos"}
          </SheetDescription>
        </header>
        {items.length === 0 ? (
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-5 py-8 text-center">
            <ShoppingBag className="h-10 w-10 text-primary/50" aria-hidden />
            <p className="mt-5 font-serif text-2xl">Tu carrito todavía está esperando recuerdos.</p>
            <Button asChild className="mt-6">
              <SheetClose asChild>
                <Link to="/tienda">Explorar servicios</Link>
              </SheetClose>
            </Button>
          </div>
        ) : (
          <>
            <div className="cart-drawer-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 [scrollbar-gutter:stable] [scrollbar-width:thin] sm:px-5">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} compact />
              ))}
            </div>
            <footer className="shrink-0 border-t border-border bg-ivory px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-5 sm:pt-5">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm">Subtotal</span>
                <strong className="text-lg tabular-nums">{formatPrice(subtotal)}</strong>
              </div>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                El envío se calcula posteriormente.
              </p>
              <Button asChild size="lg" className="mt-3 w-full">
                <SheetClose asChild>
                  <Link to="/carrito">Revisar carrito</Link>
                </SheetClose>
              </Button>
            </footer>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
