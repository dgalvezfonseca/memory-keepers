import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import closingImage from "@/assets/historicas/Nuevo-servicio-super-8.png";

export default function FinalCTA() {
  return (
    <section className="px-5 pb-4 pt-8 lg:px-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden bg-ink text-background md:grid-cols-12">
        <figure className="min-h-64 md:col-span-5 md:min-h-[28rem]">
          <img
            src={closingImage}
            alt="Caja de archivo con fotografías, álbumes y rollos de película"
            loading="lazy"
            width={1080}
            height={1350}
            sizes="(min-width: 768px) 42vw, 100vw"
            className="h-full w-full object-contain p-5 sm:p-8"
          />
        </figure>
        <div className="flex flex-col justify-center px-6 py-14 sm:px-10 md:col-span-7 md:px-14 md:py-20 lg:px-20">
          <p className="eyebrow !text-background/60">Tu archivo familiar</p>
          <h2 className="display mt-4 max-w-2xl text-4xl sm:text-5xl lg:text-6xl">
            Lo que hoy está guardado puede volver a compartirse.
          </h2>
          <p className="mt-6 max-w-lg leading-7 text-background/70">
            Empieza por el formato que tienes. Ahí encontrarás las opciones para digitalizarlo.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/tienda">
                Digitaliza tus recuerdos <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-background/35 bg-transparent text-background hover:border-background/60 hover:bg-background/10 hover:text-background sm:w-auto"
            >
              <Link to="/servicios">Ver servicios</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
