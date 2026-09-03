import { Section } from "@/components/ui/section";
import preparacion from "@/assets/historicas/Preparacion-fotografias-mikuva.png";

const VALUES = [
  {
    title: "Un proceso según el material",
    text: "Fotografías, álbumes, negativos, diapositivas y película no se presentan como si fueran el mismo servicio.",
  },
  {
    title: "Decisiones que puedes revisar",
    text: "Las opciones de formato y cantidad quedan visibles antes de avanzar con tu selección.",
  },
  {
    title: "Espacio para preguntar",
    text: "Si no reconoces el formato o no sabes cuánto material tienes, puedes pedir orientación antes de elegir.",
  },
];

export default function WhyMikuva() {
  return (
    <Section tone="default">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-8">
        <div className="lg:col-span-5 lg:pt-16">
          <p className="eyebrow">Por qué Mikuva</p>
          <h2 className="display mt-3 max-w-lg text-3xl md:text-5xl">
            Confiar empieza por entender qué pasará después.
          </h2>
          <p className="mt-6 max-w-md leading-7 text-muted-foreground">
            Tu archivo familiar puede ser irreemplazable. Por eso la experiencia debe ayudarte a
            elegir con claridad, sin esconder dudas detrás de promesas generales.
          </p>
          <dl className="mt-10 border-t border-border">
            {VALUES.map((value, index) => (
              <div
                key={value.title}
                className="grid grid-cols-[2rem_1fr] gap-3 border-b border-border py-5"
              >
                <span
                  className="pt-0.5 text-xs font-semibold tabular-nums text-foreground/65"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <dt className="font-medium text-foreground">{value.title}</dt>
                  <dd className="mt-2 text-sm leading-6 text-muted-foreground">{value.text}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <figure className="lg:col-span-7 lg:pl-8">
          <div className="overflow-hidden border border-border bg-card p-1.5">
            <img
              src={preparacion}
              alt="Manos organizando por grupos varias pilas de fotografías familiares"
              loading="lazy"
              width={1408}
              height={768}
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="aspect-[4/3] max-h-[30rem] w-full object-cover sm:aspect-[7/5] lg:aspect-[5/4] lg:max-h-[34rem]"
            />
          </div>
          <figcaption className="mt-3 flex justify-between gap-4 text-xs text-muted-foreground">
            <span>Preparación del archivo</span>
            <span>Archivo de trabajo</span>
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
