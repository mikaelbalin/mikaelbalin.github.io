"use client";

import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { HeaderMenu } from "../components/HeaderMenu";
import { Footer } from "../components/Footer";

export default function Template({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <HeaderMenu />
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}
