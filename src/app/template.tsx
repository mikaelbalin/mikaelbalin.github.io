"use client";

import { AppShell, AppShellFooter, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { HeaderMenu } from "../components/HeaderMenu";
import { Footer } from "../components/Footer";
import styles from "./template.module.css";

export default function Template({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <HeaderMenu />
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
      <AppShellFooter className={styles.footer}>
        <Footer />
      </AppShellFooter>
    </AppShell>
  );
}
