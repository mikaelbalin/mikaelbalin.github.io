import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password should have at least 8 characters" }),
});

export type SigninSchema = z.infer<typeof signinSchema>;

export const signupSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20, { message: "username should have at least 3 characters" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8).max(100, {
    message: "Password should have at least 8 characters",
  }),
});

export type SignupSchema = z.infer<typeof signupSchema>;
