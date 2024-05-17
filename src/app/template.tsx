"use client";

import { animated, useSpring } from "@react-spring/web";
import { useEffect } from "react";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { HeaderMenu } from "../components/HeaderMenu";
import styles from "./template.module.css";

export default function Template({ children }: { children: React.ReactNode }) {
  const [springs, api] = useSpring(() => ({ y: -100 }));

  useEffect(() => {
    api.start({ y: 0 });
  }, [api]);

  return (
    <div className={styles.root}>
      <animated.header style={springs} className={styles.header}>
        <HeaderMenu />
      </animated.header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <Contact />
        <Footer />
      </footer>
    </div>
  );
}
