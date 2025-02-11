import { getLocale } from "@/utilities/getLocale";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function NotFound() {
  const headersList = await headers();
  const locale = getLocale(headersList);

  redirect(`/${locale}/not-found`);
}
