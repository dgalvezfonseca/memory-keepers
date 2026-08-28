import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Section, SectionHeading } from "@/components/ui/section";
import { CATEGORIES, PRODUCTS } from "@/data/catalog";
import { formatPrice } from "@/lib/format";

const DESCRIPTIONS: Record<string, string> = {
  fotografias: "Digitalizamos tus fotografías impresas en alta resolución.",
  negativos: "Recuperamos el detalle que quedó guardado en la película.",
  diapositivas: "Volvemos a ver las transparencias, cuadro por cuadro.",
  albumes: "Escaneamos álbumes completos sin desmontar una sola foto.",
  peliculas: "Carretes de 8mm y Super 8 transferidos con cuidado.",
};

export default function CategoryGrid() {
  return (
    <Section tone="default">
      <SectionHeading
        eyebrow="Qué puedes digitalizar"
        title="Cada formato tiene su propio proceso."
        description="No todo el material se trata igual. Elegimos el equipo y el manejo según lo que llega a nuestras manos."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category) => {
          const cheapest = Math.min(
            ...PRODUCTS.filter((p) => p.category === category.slug).map((p) => p.priceFrom),
          );
          return (
            <Link
              key={category.slug}
              to="/tienda"
              search={{ categoria: category.slug }}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/40"
            >
              <img
                src={category.image}
                alt={category.tagline}
                loading="lazy"
                width={1024}
                height={768}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-2xl">{category.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {DESCRIPTIONS[category.slug]}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-sm text-muted-foreground">
                    Desde{" "}
                    <span className="font-semibold text-foreground">
                      {formatPrice(cheapest)}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Ver opciones
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
