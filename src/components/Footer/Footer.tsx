"use client";

import { Container, Group, Anchor } from "@mantine/core";
import classes from "./Footer.module.css";
import { Contact } from "@/components/Contact";

const links = [
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Blog" },
  { link: "#", label: "Careers" },
];

export function Footer() {
  const items = links.map((link) => (
    <Anchor<"a">
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <footer className="border border-r-neutral-500">
      <Contact />
      <Container className={classes.inner}>
        Mikhail Balin
        <Group className={classes.links}>{items}</Group>
      </Container>
    </footer>
  );
}
