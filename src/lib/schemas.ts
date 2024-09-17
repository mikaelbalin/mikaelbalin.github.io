import { z } from "zod";

const email = z.string().email({ message: "Invalid email" }).min(3).max(20);

const password = z
  .string({ message: "Invalid password" })
  .min(6, {
    message: "Password must have at least 6 or more characters",
  })
  .max(100, {
    message: "Password must be between 6 and 100 characters",
  });

export const signinSchema = z.object({
  identifier: email,
  password,
});

export type SigninSchema = z.infer<typeof signinSchema>;

export const signupSchema = z.object({
  username: z.string().min(3).max(20),
  email,
  password,
});

export type SignupSchema = z.infer<typeof signupSchema>;
