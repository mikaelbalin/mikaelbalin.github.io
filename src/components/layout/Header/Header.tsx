"use client";

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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { cn } from "@/utilities/cn";
import { i18n, type LocaleParams, type Locale } from "@/i18n-config";
import { usePathname, useParams } from "next/navigation";
import { LangugeToggle } from "@/components/ui/LangugeToggle";
import { Header as HeaderProps } from "@/types/payload";

type NavLink = NonNullable<HeaderProps["navItems"]>[number];
type MenuItem = NavLink["link"];

const labels: Record<Locale, string> = {
  en: "English",
  pt: "Portugais",
};

const languageMenuItems: MenuItem[] = i18n.locales.map((locale) => ({
  url: locale,
  label: labels[locale],
}));

const redirectedPathName = (pathName: string, locale?: null | string) => {
  const segments = pathName.split("/");
  segments[1] = locale || i18n.defaultLocale;
  return segments.join("/");
};

export function Header(props: HeaderProps) {
  const { logo, navItems: navLinks } = props;

  const pathName = usePathname();
  const { lang } = useParams<LocaleParams>();

  const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const [
    linksOpened,
    { toggle: toggleLinks, close: closeLinks, open: openLinks },
  ] = useDisclosure(false);

  // Mobile language menu items
  const languageButtons = languageMenuItems.map((item) => (
    <Link
      key={item.label}
      className={cn(
        "flex items-center w-full h-11 px-6 dark:text-white",
        "text-sm font-medium",
      )}
      onClick={closeDrawer}
      href={redirectedPathName(pathName, item.url)}
    >
      {item.label}
    </Link>
  ));

  const localeNavLink: NavLink = {
    link: { label: labels[lang], url: lang },
  };

  const links = [...(navLinks || []), localeNavLink];

  const menu = links.map(({ link }, index) => {
    if (index === links.length - 1) {
      // Desktop language menu items
      const menuItems = languageMenuItems.map((item) => (
        <Menu.Item
          key={item.label}
          component={Link}
          href={redirectedPathName(pathName, item.url)}
          className={cn("dark:text-white", "font-medium")}
        >
          {item.label}
        </Menu.Item>
      ));

      return (
        // Desktop language menu
        <Menu
          key={index}
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
            <UnstyledButton
              className={cn(
                "px-4 flex items-center text-black dark:text-white",
                "text-sm font-medium",
                "sm:text-lg sm:leading-13 sm:px-0",
              )}
            >
              <LangugeToggle label={link.label} linksOpened={linksOpened} />
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown className="shadow-lg">{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      // All other menu items
      <Anchor
        key={index}
        component={Link}
        href={
          link.url?.includes("contact")
            ? `${pathName}${link.url}`
            : `/${lang}${link.url}`
        }
        onClick={closeDrawer}
        className={cn(
          "flex items-center w-full h-11 px-4",
          "text-sm text-black dark:text-white font-medium",
          "sm:w-auto sm:h-full sm:px-0",
        )}
      >
        {link.label}
      </Anchor>
    );
  });

  const logoElement = <Logo text={logo.link.label} lang={lang} />;

  return (
    <header
      className={cn("absolute w-full z-10", {
        "motion-safe:animate-slide": false,
      })}
    >
      <Container className="h-16 sm:h-19.5">
        <Group justify="space-between" className="h-full">
          {logoElement}
          <Group gap="xl">
            <Group className="hidden sm:flex gap-8">{menu}</Group>
            <ColorSchemeToggle />
            <Burger
              opened={drawerOpened}
              onClick={openDrawer}
              hiddenFrom="sm"
              aria-label="Open navigation"
            />
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
            {logoElement}
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
                className={cn(
                  "flex items-center w-full h-11 px-4 text-black dark:text-white",
                  "text-sm font-medium",
                )}
              >
                <LangugeToggle label={labels[lang]} linksOpened={linksOpened} />
              </UnstyledButton>
              <Collapse in={linksOpened}>{languageButtons}</Collapse>
            </ScrollArea>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </header>
  );
}
