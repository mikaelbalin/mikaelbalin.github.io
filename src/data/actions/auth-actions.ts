"use server";

import { type SignupFormValues } from "@/components/forms/SignupForm";

export async function registerUserAction(data: SignupFormValues) {
  console.log("Hello From Register User Action");
}
