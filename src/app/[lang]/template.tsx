import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getGlobalPageData } from "@/data/loaders";
import { PropsWithChildren } from "react";

export default async function Template({ children }: PropsWithChildren) {
  const globalData = await getGlobalPageData();
  return (
    <div className="relative flex flex-col min-h-screen">
      <Header {...globalData.attributes.header} />
      <main className="flex-1">{children}</main>
      <Footer {...globalData.attributes.footer} />
    </div>
  );
}