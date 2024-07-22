"use client";

import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RootRefContext } from "@/context";

import { PropsWithChildren, useRef } from "react";

export default function Template({ children }: PropsWithChildren) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  // const globalData = await getGlobalPageData();

  return (
    <div ref={rootRef} className="relative flex flex-col min-h-screen">
      <Header />
      <RootRefContext.Provider value={rootRef}>
        <main className="flex-1">{children}</main>
      </RootRefContext.Provider>
      <footer className="border border-r-neutral-500">
        <Contact />
        <Footer />
      </footer>
    </div>
  );
}
