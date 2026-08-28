import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-memories.jpg";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ivory">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-14 md:pb-24 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8">
        <div className="fade-up">
          <p className="eyebrow">Digitalización de recuerdos familiares</p>
          <h1 className="display mt-5 text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-7xl">
            Los recuerdos no
            <br />
            deberían desaparecer.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Digitalizamos fotografías, negativos, diapositivas, álbumes y películas para
            conservar tus historias por generaciones.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-7">
              <Link to="/tienda">Digitaliza tus recuerdos</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-7">
              <Link to="/servicios">Ver servicios</Link>
            </Button>
          </div>
          <p className="mt-8 border-l-2 border-primary/40 pl-4 text-sm italic text-muted-foreground">
            Tratamos cada recuerdo como si fuera nuestro.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-lg border border-border bg-card p-2 shadow-sm">
            <img
              src={heroImage}
              alt="Fotografías impresas, un álbum familiar abierto y tiras de negativos sobre una tela clara"
              width={1600}
              height={1200}
              className="h-full w-full rounded-md object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-4 hidden rounded-md border border-border bg-card px-4 py-3 shadow-sm sm:block">
            <p className="eyebrow">Archivo familiar</p>
            <p className="mt-1 font-serif text-lg">1962 — 2026</p>
          </div>
        </div>
      </div>
    </section>
  );
}
