import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getGlobalPageData } from "@/data";
import { PropsWithChildren } from "react";

export default function Template({ children }: PropsWithChildren) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
