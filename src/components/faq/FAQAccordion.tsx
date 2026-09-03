import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/types/catalog";

export default function FAQAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, index) => (
        <AccordionItem key={item.question} value={`question-${index}`}>
          <AccordionTrigger className="py-5 text-left text-base no-underline hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="max-w-2xl pb-6 leading-relaxed text-muted-foreground">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
