"use client";

import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { HeaderMenu } from "@/components/HeaderMenu";
import { RootRefContext } from "@/context";
import { animated, useSpring } from "@react-spring/web";
import { PropsWithChildren, useEffect, useRef } from "react";

export default function Template({ children }: PropsWithChildren) {
  const [springs, api] = useSpring(() => ({ y: -100 }));
  const rootRef = useRef<HTMLDivElement | null>(null);
  // const globalData = await getGlobalPageData();

  useEffect(() => {
    api.start({ y: 0 });
  }, [api]);

  return (
    <div ref={rootRef} className="relative flex flex-col min-h-screen">
      <animated.header style={springs} className="absolute w-full z-10">
        <HeaderMenu />
      </animated.header>
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
