"use server";

import { redirect } from "next/navigation";

/**
 * Redirects the user to a WhatsApp chat with the specified phone number.
 * Uses the wa.me URL format which is WhatsApp's official link format for starting conversations.
 *
 * @param phone - The phone number to start a WhatsApp chat with, should not include any formatting characters.
 * @returns A Promise that resolves when the redirect is initiated.
 *
 * @example
 * ```tsx
 * // Redirect to WhatsApp chat with the number +1234567890
 * await redirectToWhatsApp("1234567890");
 * ```
 */
export async function redirectToWhatsApp(phone: string) {
  redirect(`https://wa.me/${phone}`);
}
