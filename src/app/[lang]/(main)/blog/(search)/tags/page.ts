import { redirect } from "next/navigation";

export default function Page() {
  redirect("/blog/tags/all");
}