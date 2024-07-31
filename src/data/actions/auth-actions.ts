"use server";

import { SignupSchema, signupSchema } from "@/lib/schemas";

export async function registerUserAction(data: SignupSchema): Promise<
  SignupSchema & {
    errors?: {
      username?: string[];
      email?: string[];
      password?: string[];
    };
    message: string;
  }
> {
  const validatedFields = signupSchema.safeParse(data);

  if (!validatedFields.success) {
    console.log(validatedFields.error.errors);
    return {
      ...data,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid form data",
    };
  }

  return {
    ...data,
    message: "User registered successfully",
  };
}
