"use client";

import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { HeaderMenu } from "@/components/HeaderMenu";
import { RootRefContext } from "@/context";
import { animated, useSpring } from "@react-spring/web";
import { PropsWithChildren, useEffect, useRef } from "react";
import styles from "./template.module.css";

export default function Template({ children }: PropsWithChildren) {
  const [springs, api] = useSpring(() => ({ y: -100 }));
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    api.start({ y: 0 });
  }, [api]);

  return (
    <div ref={rootRef} className={styles.root}>
      <animated.header style={springs} className={styles.header}>
        <HeaderMenu />
      </animated.header>
      <RootRefContext.Provider value={rootRef}>
        <main className={styles.main}>{children}</main>
      </RootRefContext.Provider>
      <footer className={styles.footer}>
        <Contact />
        <Footer />
      </footer>
    </div>
  );
}
