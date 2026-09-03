import { useCallback, useRef, useState, type PointerEvent } from "react";

import photo from "@/assets/historicas/Fotos-minimikuva.png";
import { Section, SectionHeading } from "@/components/ui/section";

export default function BeforeAfter() {
  const [position, setPosition] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);

  const setFromPointer = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const bounds = frameRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const next = ((event.clientX - bounds.left) / bounds.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  return (
    <Section tone="sand">
      <div className="grid items-center gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <SectionHeading
          eyebrow="Antes y después"
          title="El detalle vuelve a estar al alcance."
          description="Desliza para explorar el comparador. La muestra definitiva se agregará con un caso real autorizado; por ahora ambas vistas conservan la misma imagen y no representan una restauración."
        />
        <div>
          <div
            ref={frameRef}
            className="relative aspect-[4/3] touch-none select-none overflow-hidden rounded-xl border border-border bg-card shadow-sm"
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              setFromPointer(event);
            }}
            onPointerMove={(event) => {
              if (event.currentTarget.hasPointerCapture(event.pointerId)) setFromPointer(event);
            }}
          >
            <img
              src={photo}
              alt="Fotografía de muestra para comparación"
              className="h-full w-full object-cover"
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
              aria-hidden
            >
              <img src={photo} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-ink/10" />
            </div>
            <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs text-white">
              Original
            </span>
            <span className="absolute right-3 top-3 rounded-full bg-card/90 px-3 py-1 text-xs text-foreground">
              Digitalizada
            </span>
            <div
              className="absolute inset-y-0 w-px bg-white shadow"
              style={{ left: `${position}%` }}
              aria-hidden
            >
              <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-card text-sm shadow">
                ↔
              </span>
            </div>
          </div>
          <label className="sr-only" htmlFor="comparison-position">
            Posición del comparador antes y después
          </label>
          <input
            id="comparison-position"
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            className="mt-5 w-full accent-primary"
            aria-valuetext={`${position}% de la imagen original visible`}
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Muestra visual pendiente de reemplazo por un caso real autorizado.
          </p>
        </div>
      </div>
    </Section>
  );
}
