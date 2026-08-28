import { Section } from "@/components/ui/section";
import escaneo from "@/assets/proceso-escaneo.jpg";

export const VALUES = [
  {
    title: "Manejo cuidadoso de originales",
    text: "Cada pieza se registra al llegar y se manipula con guantes y superficies limpias.",
  },
  {
    title: "Digitalización profesional",
    text: "Equipo dedicado según el formato: papel, película, transparencia o carrete.",
  },
  {
    title: "Control de calidad",
    text: "Revisamos archivo por archivo antes de entregar. Si algo no salió bien, se repite.",
  },
  {
    title: "Privacidad",
    text: "Tu material no se publica ni se comparte. Las copias de trabajo se eliminan al cerrar el pedido.",
  },
  {
    title: "Atención personalizada",
    text: "Hablas con la misma persona desde la cotización hasta la entrega.",
  },
  {
    title: "Entrega organizada",
    text: "Archivos nombrados y ordenados por carpetas, listos para guardar y compartir.",
  },
];

export default function WhyMikuva() {
  return (
    <Section tone="default">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Por qué Mikuva</p>
          <h2 className="display mt-3 text-3xl md:text-4xl">
            Las fotos envejecen.
            <br />
            Las historias no deberían.
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
            Trabajamos con material que no tiene copia. Por eso cada pedido tiene un
            registro, un responsable y una revisión final antes de salir.
          </p>
          <div className="mt-8 overflow-hidden rounded-lg border border-border">
            <img
              src={escaneo}
              alt="Especialista con guantes colocando una fotografía antigua en un escáner profesional"
              loading="lazy"
              width={1400}
              height={1000}
              className="w-full object-cover"
            />
          </div>
        </div>

        <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {VALUES.map((value) => (
            <div key={value.title} className="border-t border-border pt-5">
              <dt className="font-medium text-foreground">{value.title}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {value.text}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
