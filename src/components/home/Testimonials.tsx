import { Quote } from "lucide-react";

import { Section, SectionHeading } from "@/components/ui/section";

const TESTIMONIALS = [
  "Familia por confirmar",
  "Cliente por confirmar",
  "Archivo familiar por confirmar",
];

export default function Testimonials() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Historias preservadas"
        title="La confianza se construye recuerdo por recuerdo."
        description="Este espacio está preparado para compartir experiencias verificadas de familias que han confiado su material a Mikuva."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((name) => (
          <figure
            key={name}
            className="flex min-h-64 flex-col rounded-xl border border-border bg-card p-7"
          >
            <Quote className="h-6 w-6 text-primary/60" aria-hidden />
            <blockquote className="mt-8 flex-1 font-serif text-xl leading-relaxed text-foreground">
              [TESTIMONIO REAL POR AGREGAR]
            </blockquote>
            <figcaption className="mt-7 border-t border-border pt-4 text-sm text-muted-foreground">
              {name}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
