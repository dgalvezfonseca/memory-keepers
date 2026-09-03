import { z } from "zod";

export const CONTACT_MATERIALS = [
  "Fotografías",
  "Negativos",
  "Diapositivas",
  "Álbumes",
  "8mm / Super 8",
  "Varios formatos",
] as const;

export const contactFormSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().toLowerCase().email().max(254),
    phone: z
      .string()
      .trim()
      .min(8)
      .max(32)
      .regex(/^[0-9+() .-]+$/),
    material: z.enum(CONTACT_MATERIALS),
    message: z.string().trim().min(10).max(2_000),
    botcheck: z.boolean().optional().default(false),
  })
  .strict();

export type ContactFormInput = z.input<typeof contactFormSchema>;
