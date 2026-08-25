import { z } from "zod";

const email = z
  .email({ message: "Invalid email" })
  .min(5, "Invalid email")
  .max(50, "Invalid email");

export const bskyLoginSchema = z.object({
  handle: z
    .string()
    .min(3, { message: "Handle must be at least 3 characters" })
    .max(100, { message: "Handle must be at most 100 characters" })
    .regex(
      /^[a-zA-Z0-9.-]+$/,
      "Handle can only contain letters, numbers, dots and hyphens",
    ),
});

export type BskyLoginSchema = z.infer<typeof bskyLoginSchema>;

export const subscriptionSchema = z.object({ email });

export type SubscriptionSchema = z.infer<typeof subscriptionSchema>;

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name must be at most 20 characters long" }),
  email,
  message: z.string().min(1, "Message is required").max(500),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms of service",
  }),
  newsletter: z.boolean().optional(),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
