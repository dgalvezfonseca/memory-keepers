import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { CATEGORY_LABEL } from "@/data/catalog";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/catalog";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-transform duration-300 hover:-translate-y-1">
      <Link to="/producto/$slug" params={{ slug: product.slug }} className="overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={768}
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">{CATEGORY_LABEL[product.category]}</p>
        <h2 className="mt-2 font-serif text-2xl">
          <Link to="/producto/$slug" params={{ slug: product.slug }} className="hover:text-primary">
            {product.name}
          </Link>
        </h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {product.shortDescription}
        </p>
        <div className="mt-6 flex items-end justify-between gap-4 border-t border-border pt-5">
          <p className="text-xs text-muted-foreground">
            Desde{" "}
            <span className="block text-lg font-semibold text-foreground">
              {formatPrice(product.priceFrom)}
            </span>
          </p>
          <Link
            to="/producto/$slug"
            params={{ slug: product.slug }}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary"
          >
            Ver opciones <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
