import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

import { SITE } from "@/constants/site";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div className="fade-up max-w-[16rem] rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-medium text-foreground">
              ¿No sabes qué paquete necesitas?
            </p>
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar mensaje"
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Te ayudamos por WhatsApp: {SITE.whatsapp}
          </p>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Contactar por WhatsApp"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform hover:scale-105"
      >
        <MessageCircle className="h-5 w-5" aria-hidden />
      </button>
    </div>
  );
}
