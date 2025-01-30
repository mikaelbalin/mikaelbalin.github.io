"use server";

import { redirect } from "next/navigation";

export async function contact(phone: string) {
  redirect(`https://wa.me/${phone}`);
}
