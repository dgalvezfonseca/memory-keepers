import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import heroImage from "@/assets/historicas/portadamikuva.png";

export default function Hero() {
  return (
    <section className="relative overflow-x-clip border-b border-border bg-ivory">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-12 pt-10 md:pb-16 md:pt-14 lg:min-h-[38rem] lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-8">
        <div className="fade-up relative z-10 min-w-0 lg:col-span-5 lg:py-10">
          <p className="eyebrow text-foreground">Archivo familiar, llevado al presente</p>
          <h1 className="display mt-5 max-w-2xl text-[clamp(2.75rem,10vw,4.5rem)] leading-[0.98] lg:text-[4.6rem]">
            Tus recuerdos,
            <span className="block text-primary">listos para volver a verse.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Digitalizamos fotografías, álbumes, negativos, diapositivas y películas familiares para
            que puedas conservarlas y compartirlas en formato digital.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/tienda">
                Digitaliza tus recuerdos <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link to="/servicios">Ver servicios</Link>
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-4 border-t border-foreground/15 pt-4 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:gap-6">
            <span>Conservar</span>
            <span className="h-1 w-1 bg-primary" aria-hidden />
            <span>Proteger</span>
            <span className="h-1 w-1 bg-primary" aria-hidden />
            <span>Compartir</span>
          </div>
        </div>

        <figure className="relative min-w-0 lg:col-span-7 lg:-mr-20 xl:-mr-28">
          <div className="overflow-hidden border-y border-l border-border bg-card p-1.5 sm:p-2">
            <img
              src={heroImage}
              alt="Fotografías familiares impresas junto a una tableta que muestra un retrato"
              width={1408}
              height={768}
              fetchPriority="high"
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="aspect-[16/10] max-h-[22rem] w-full object-cover sm:max-h-[26rem] lg:h-[29rem] lg:max-h-none lg:aspect-auto"
            />
          </div>
          <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs text-muted-foreground lg:px-2">
            <span>Fotografías · álbumes · negativos · película</span>
            <span className="font-medium text-foreground">Archivo familiar</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
