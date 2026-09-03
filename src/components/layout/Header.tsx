import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import CartDrawer from "@/components/cart/CartDrawer";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MAIN_NAV } from "@/constants/site";
import Logo from "./Logo";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:h-20 lg:px-8">
        <Link to="/" aria-label="Mikuva, inicio" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 xl:flex">
          {MAIN_NAV.slice(1).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="inline-flex min-h-11 items-center border-b-2 border-transparent text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "border-primary text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <CartDrawer />

          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/tienda">Digitaliza tus recuerdos</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Abrir menú">
                <Menu className="h-5 w-5" aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm bg-ivory">
              <SheetTitle className="sr-only">Menú</SheetTitle>
              <nav className="mt-10 flex flex-col gap-1 px-2" aria-label="Móvil">
                {MAIN_NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="border-b border-border/60 py-4 font-serif text-2xl text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button asChild className="mt-8" onClick={() => setOpen(false)}>
                  <Link to="/tienda">Digitaliza tus recuerdos</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
