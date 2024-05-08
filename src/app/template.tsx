"use client";

import { HeaderMenu } from "../components/HeaderMenu";
import { Footer } from "../components/Footer";
import styles from "./template.module.css";
import { useSpring, animated } from "@react-spring/web";
import { useEffect } from "react";
import { Contact } from "../components/Contact";

export default function Template({ children }: { children: React.ReactNode }) {
  const [springs, api] = useSpring(() => ({ y: -100 }));

  useEffect(() => {
    api.start({ y: 0 });
  }, [api]);

  return (
    <div className={styles.container}>
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
