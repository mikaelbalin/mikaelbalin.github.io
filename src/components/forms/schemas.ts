import { z } from "zod";

const password = z
  .string({ message: "Invalid password" })
  .min(6, {
    message: "Password must have at least 6 or more characters",
  })
  .max(100, {
    message: "Password must be between 6 and 100 characters",
  });

const email = z
  .string()
  .email({ message: "Invalid email" })
  .min(5, "Invalid email")
  .max(20, "Invalid email");

export const signinSchema = z.object({
  identifier: z
    .string()
    .min(3, {
      message: "Identifier must have at least 3 or more characters",
    })
    .max(20, {
      message: "Please enter a valid username or email address",
    }),
  password,
});

export type SigninSchema = z.infer<typeof signinSchema>;

export const signupSchema = z.object({
  username: z.string().min(3).max(20),
  email,
  password,
});

export type SignupSchema = z.infer<typeof signupSchema>;

export const subscriptionSchema = z.object({ email });

export type SubscriptionSchema = z.infer<typeof subscriptionSchema>;

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(20, { message: "Name must be at most 20 characters long" }),
  email,
  message: z.string().min(1, "Message is required").max(500),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms of service",
  }),
  newsletter: z.boolean(),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
