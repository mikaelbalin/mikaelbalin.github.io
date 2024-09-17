"use server";

import { signinSchema, SignupSchema, signupSchema } from "@/lib/schemas";
import {
  loginUserService,
  registerUserService,
} from "@/data/services/auth-service";
import { StrapiErrorsProps } from "@/components/ui/StrapiErrors";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

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

  redirect("/me");
}

export async function loginUserAction(prevState: any, formData: FormData) {
  const validatedFields = signinSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    };
  }

  const responseData = await loginUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Login.",
    };
  }

  cookies().set("jwt", responseData.jwt, config);

  redirect("/dashboard");
}

export async function logoutAction() {
  cookies().set("jwt", "", { ...config, maxAge: 0 });
  redirect("/");
}
