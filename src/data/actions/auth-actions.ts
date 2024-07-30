"use server";

import { type SignupFormSchema } from "@/components/forms/SignupForm";
import { signupSchema } from "@/lib/schemas";

export async function registerUserAction(data: SignupFormSchema) {
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
