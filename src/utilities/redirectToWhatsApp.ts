"use server";

import { redirect } from "next/navigation";

export async function redirectToWhatsApp(phone: string) {
  redirect(`https://wa.me/${phone}`);
}
