import { generateLanguageParams } from "../../../../../../i18n-config";
import { redirect } from "next/navigation";

export const generateStaticParams = generateLanguageParams;

export default function Page() {
  redirect("/blog/tags/all");
}
