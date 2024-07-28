import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getGlobalPageData } from "@/data";
import { PropsWithChildren } from "react";

export default async function Template({ children }: PropsWithChildren) {
  const globalData = await getGlobalPageData();
  console.log({ globalData });
  return (
    <div className="relative flex flex-col min-h-screen">
      <Header {...globalData.attributes.header} />
      <main className="flex-1">{children}</main>
      <Footer {...globalData.attributes.footer} />
    </div>
  );
}
