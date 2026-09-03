import { z } from "zod";

const customerSchema = z
  .object({
    firstName: z.string().trim().min(1).max(100),
    lastName: z.string().trim().min(1).max(140),
    email: z.string().trim().toLowerCase().email().max(254),
    phone: z
      .string()
      .trim()
      .min(8)
      .max(32)
      .regex(/^[0-9+() .-]+$/),
  })
  .strict();

const orderItemSchema = z
  .object({
    productId: z.number().int().positive(),
    variantId: z.number().int().positive().nullable().optional(),
    quantity: z.number().int().positive().max(10_000),
  })
  .strict();

export const createOrderInputSchema = z
  .object({
    checkoutRequestId: z.string().uuid().optional(),
    customer: customerSchema,
    items: z.array(orderItemSchema).min(1).max(100),
  })
  .strict();

export const orderIdSchema = z.number().int().positive();
export const orderFolioSchema = z
  .string()
  .trim()
  .regex(/^MK-\d{4}-\d{5,}$/);

export type CreateOrderInput = z.infer<typeof createOrderInputSchema>;
