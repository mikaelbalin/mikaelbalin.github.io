"use server";

import { SignupSchema, signupSchema } from "@/lib/schemas";
import { registerUserService } from "@/data/services/auth-service";
import { StrapiErrorsProps } from "@/components/ui/StrapiErrors";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerUserAction(data: SignupSchema): Promise<
  | (SignupSchema & {
      errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
      };
      message: string;
      strapiError?: StrapiErrorsProps;
    })
  | undefined
> {
  const validatedFields = signupSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      ...data,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid form data",
    };
  }

  const responseData = await registerUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...data,
      message: "An error occurred while registering the user",
    };
  }

  if (responseData.error) {
    return {
      ...data,
      strapiError: responseData.error,
      message: "User registration failed",
    };
  }

  cookies().set("jwt", responseData.jwt, {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
    domain: process.env.HOST ?? "localhost",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/");
}
