import { Section, SectionHeading } from "@/components/ui/section";

export const STEPS = [
  {
    title: "Elige tu servicio",
    text: "Selecciona el formato y la cantidad aproximada de material. Si tienes dudas, te ayudamos antes de pagar.",
  },
  {
    title: "Prepara y envía tus recuerdos",
    text: "Te damos una guía sencilla de empaque. Puedes entregarlo en persona o mandarlo por paquetería.",
  },
  {
    title: "Digitalizamos y revisamos",
    text: "Cada pieza se digitaliza y se revisa una por una antes de pasar a control de calidad.",
  },
  {
    title: "Recibe tus archivos y originales",
    text: "Te entregamos tus archivos organizados y te devolvemos todos tus originales.",
  },
];

export default function HowItWorks() {
  return (
    <Section tone="sand">
      <SectionHeading
        eyebrow="Cómo funciona"
        title="Cuatro pasos, sin complicaciones."
      />

      <ol className="mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
        {STEPS.map((step, index) => (
          <li key={step.title} className="relative md:pt-8">
            <span
              className="absolute left-0 top-0 hidden h-px w-full bg-border md:block"
              aria-hidden
            />
            <span
              className="absolute -top-[7px] left-0 hidden h-3.5 w-3.5 rounded-full border-2 border-primary bg-sand md:block"
              aria-hidden
            />
            <p className="eyebrow">Paso {index + 1}</p>
            <h3 className="mt-2 font-serif text-xl">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
