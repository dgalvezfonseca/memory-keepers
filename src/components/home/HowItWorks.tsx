import { Section, SectionHeading } from "@/components/ui/section";
import { PROCESS_STEPS } from "@/constants/process";

export default function HowItWorks() {
  return (
    <Section tone="sand">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="Cómo funciona" title="Del material original a tus archivos." />
          <p className="mt-7 border-l-2 border-primary pl-5 text-sm leading-6 text-muted-foreground">
            El proceso sigue una secuencia clara. Los detalles de entrega y envío se confirman según
            tu servicio.
          </p>
        </div>

        <ol className="border-t border-foreground/25 lg:col-span-8">
          {PROCESS_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="grid gap-3 border-b border-foreground/20 py-7 sm:grid-cols-[4rem_1fr] sm:gap-6 md:grid-cols-[4rem_0.8fr_1.2fr] md:items-baseline"
            >
              <span className="font-serif text-3xl text-primary" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-xl leading-tight text-foreground">{step.title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
