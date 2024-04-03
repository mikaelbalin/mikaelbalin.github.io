"use client";

import { Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { HeaderMenu } from "../components/HeaderMenu";
import { Footer } from "../components/Footer";
import styles from "./template.module.css";

export default function Template({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <HeaderMenu />
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
