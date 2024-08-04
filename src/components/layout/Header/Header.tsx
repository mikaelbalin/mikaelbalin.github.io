"use client";

import { IconLogin } from "@tabler/icons-react";
import { ColorSchemeToggle } from "@/components/ui/ColorSchemeToggle";
import { Logo } from "@/components/ui/Logo";
import {
  Anchor,
  Burger,
  Collapse,
  Container,
  Drawer,
  Group,
  Menu,
  ScrollArea,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { animated, useSpring } from "@react-spring/web";
import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { MouseEventHandler, useEffect, useState } from "react";
import { HeaderProps } from "@/types/data";
import { cn } from "@/lib/utils";

type MenuItem = {
  link: string;
  label: string;
  links?: Omit<MenuItem, "links">[];
};

const menuItems: MenuItem[] = [
  { link: "/blog", label: "Blog" },
  { link: "#about", label: "About" },
  { link: "/contact", label: "Contact" },
];

const languageMenuItems: MenuItem[] = [
  { link: "/", label: "English" },
  { link: "/pt", label: "Portugais" },
  { link: "/de", label: "Deutsch" },
  { link: "/fr", label: "Français" },
];

const LangugeToggle = ({
  label,
  linksOpened,
}: {
  label: string;
  linksOpened: boolean;
}) => (
  <>
    <span className="mr-1">{label}</span>
    <IconChevronDown
      size="1rem"
      style={{
        transform: `rotate(${linksOpened ? 180 : 0}deg)`,
      }}
      className="text-black"
    />
  </>
);

export function Header(props: HeaderProps) {
  const { logoText } = props;

  const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [
    linksOpened,
    { toggle: toggleLinks, close: closeLinks, open: openLinks },
  ] = useDisclosure(false);
  const [languageLink, setLanguageLink] = useState<MenuItem>(
    languageMenuItems[0],
  );
  const [springs, api] = useSpring(() => ({ y: -100 }));

  useEffect(() => {
    api.start({ y: 0 });
  }, [api]);

  const changeLanguage =
    (item: MenuItem): MouseEventHandler<HTMLButtonElement> =>
    (event) => {
      setLanguageLink(item);
      closeLinks();
    };

  const languageButtons = languageMenuItems.map((item) => (
    <UnstyledButton
      key={item.label}
      className="w-full h-11 px-6"
      onClick={changeLanguage(item)}
    >
      {item.label}
    </UnstyledButton>
  ));

  const menu = [
    ...menuItems,
    { ...languageLink, links: languageMenuItems },
  ].map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link} onClick={changeLanguage(item)}>
        {item.label}
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="click-hover"
          closeDelay={400}
          position="bottom-start"
          withinPortal
          onChange={(opened) => {
            if (!opened) {
              closeLinks();
            } else {
              openLinks();
            }
          }}
        >
          <Menu.Target>
            <Anchor
              component={Link}
              href={link.link}
              onClick={(event) => event.preventDefault()}
              className="flex items-center text-black"
            >
              <LangugeToggle label={link.label} linksOpened={linksOpened} />
            </Anchor>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Anchor
        key={link.label}
        component={Link}
        href={link.link}
        className={cn(
          "flex items-center w-full h-11 px-4",
          "text-sm text-black font-medium",
          "sm:w-auto sm:h-full sm:px-0",
        )}
      >
        {link.label}
      </Anchor>
    );
  });

  return (
    <animated.header style={springs} className="absolute w-full z-10">
      <Container className="h-15">
        <Group justify="space-between" className="h-full">
          <Logo text={logoText.text} />
          <Group gap="xl">
            <Group className="hidden sm:flex gap-8">{menu}</Group>
            <ColorSchemeToggle />
            <Burger
              opened={drawerOpened}
              onClick={openDrawer}
              hiddenFrom="sm"
              aria-label="Open navigation"
            />
            <Link href="/signin">
              <IconLogin stroke={2} />
            </Link>
          </Group>
        </Group>
      </Container>

      <Drawer.Root
        opened={drawerOpened}
        onClose={closeDrawer}
        size="md"
        padding="md"
        hiddenFrom="sm"
        position="top"
      >
        <Drawer.Overlay backgroundOpacity={0.5} blur={4} />
        <Drawer.Content>
          <Drawer.Header>
            <Logo text={logoText.text} />
            <Group gap="xl">
              <ColorSchemeToggle />
              <Burger
                opened={drawerOpened}
                onClick={closeDrawer}
                aria-label="Close navigation"
              />
            </Group>
          </Drawer.Header>

          <Drawer.Body>
            <ScrollArea mx="-md">
              {menu.slice(0, -1)}
              <UnstyledButton
                onClick={toggleLinks}
                className={cn("flex items-center w-full h-11 px-4")}
              >
                <LangugeToggle
                  label={languageLink.label}
                  linksOpened={linksOpened}
                />
              </UnstyledButton>
              <Collapse in={linksOpened}>{languageButtons}</Collapse>
              <Link
                href="/signin"
                className="flex items-center w-full h-11 px-4"
              >
                <IconLogin stroke={2} />
              </Link>
            </ScrollArea>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </animated.header>
  );
}
