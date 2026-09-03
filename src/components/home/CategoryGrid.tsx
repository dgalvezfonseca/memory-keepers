import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Section, SectionHeading } from "@/components/ui/section";
import { PRODUCTS } from "@/data/catalog";

const SERVICE_LAYOUTS = [
  "md:col-span-7",
  "md:col-span-5 md:mt-20",
  "md:col-span-5",
  "md:col-span-7 md:mt-12",
  "md:col-span-7",
  "md:col-span-5 md:mt-16",
] as const;

const SERVICE_NAMES: Record<string, string> = {
  "digitalizacion-de-fotografias": "Fotografías",
  "digitalizacion-de-negativos": "Negativos",
  "digitalizacion-de-diapositivas": "Diapositivas",
  "digitalizacion-de-albumes": "Álbumes",
  "digitalizacion-8mm": "8 mm",
  "digitalizacion-super-8": "Super 8",
};

export default function CategoryGrid() {
  return (
    <Section tone="default">
      <div className="grid min-w-0 gap-8 border-b border-border pb-10 md:grid-cols-12 md:items-end">
        <SectionHeading
          eyebrow="Qué puedes digitalizar"
          title="Una forma distinta de volver a cada recuerdo."
          className="md:col-span-8"
        />
        <p className="max-w-md text-sm leading-6 text-muted-foreground md:col-span-4 md:justify-self-end">
          Elige el material que tienes. Cada opción te lleva al servicio y a sus detalles.
        </p>
      </div>

      <div className="mt-10 grid min-w-0 gap-x-8 gap-y-14 md:grid-cols-12 md:gap-y-20 lg:gap-x-12">
        {PRODUCTS.filter((product) => product.active).map((product, index) => (
          <Link
            key={product.slug}
            to="/producto/$slug"
            params={{ slug: product.slug }}
            className={`group block min-w-0 ${SERVICE_LAYOUTS[index]}`}
          >
            <div className="overflow-hidden bg-sand">
              <img
                src={product.image}
                alt={product.shortDescription}
                loading="lazy"
                width={1024}
                height={768}
                sizes="(min-width: 768px) 55vw, 100vw"
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.015] ${
                  index % 3 === 1
                    ? "aspect-[5/4] max-h-[30rem] md:aspect-[6/5]"
                    : "aspect-[4/3] max-h-[28rem]"
                }`}
              />
            </div>
            <div className="mt-4 grid grid-cols-[auto_1fr_auto] items-start gap-3 border-t border-foreground/20 pt-4">
              <span className="pt-1 text-xs tabular-nums text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-serif text-2xl leading-none sm:text-3xl">
                  {SERVICE_NAMES[product.slug] ?? product.name}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                  {product.shortDescription}
                </p>
              </div>
              <span className="flex h-11 w-11 items-center justify-center border border-border text-foreground transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowRight className="h-4 w-4" aria-hidden />
                <span className="sr-only">Ver {SERVICE_NAMES[product.slug] ?? product.name}</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
