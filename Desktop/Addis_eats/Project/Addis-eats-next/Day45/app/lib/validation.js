import { z } from "zod";

export const orderSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters."),

  phone: z
    .string()
    .trim()
    .regex(
      /^\d{10}$/,
      "Phone number must contain exactly 10 digits."
    ),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters."),
});

export const orderSubmissionSchema = orderSchema.extend({
  items: z
    .array(
      z.object({
        id: z.union([z.string().min(1), z.number().int().positive()]),
        quantity: z.number().int().positive(),
      })
    )
    .min(1, "Your cart is empty."),
});