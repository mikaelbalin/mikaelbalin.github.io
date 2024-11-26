"use client";

// import { IconLogin } from "@tabler/icons-react";
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
import { DataLink, HeaderProps, MenuItem } from "@/types/data";
import { cn } from "@/lib/utils";
import { i18n, type Locale } from "../../../i18n-config";
import { usePathname, useParams } from "next/navigation";
import { LangugeToggle } from "@/components/ui/LangugeToggle";

const labels: Record<Locale, string> = {
  en: "English",
  pt: "Portugais",
};

const languageMenuItems: DataLink[] = i18n.locales.map((locale) => ({
  url: locale,
  text: labels[locale],
}));

export function Header(props: HeaderProps) {
  const {
    logoText,
    navLinks,
    // user
  } = props;
  console.log({ navLinks });

  const pathName = usePathname();
  const { lang } = useParams<{ lang: Locale }>();

  const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const [
    linksOpened,
    { toggle: toggleLinks, close: closeLinks, open: openLinks },
  ] = useDisclosure(false);

  const languageButtons = languageMenuItems.map((menuItem) => (
    <Link
      key={menuItem.text}
      className="flex items-center w-full h-11 px-6 dark:text-white"
      href={menuItem.url}
    >
      {menuItem.text}
    </Link>
  ));

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const langLink: MenuItem = {
    url: lang,
    text: labels[lang],
    links: languageMenuItems,
  };

  const menu = [...navLinks, langLink].map((menuItem) => {
    const menuItems = menuItem.links?.map((item) => (
      <Menu.Item
        key={item.url}
        component={Link}
        href={redirectedPathName(item.url)}
        className="dark:text-white"
      >
        {item.text}
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={menuItem.url}
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
                "px-4 flex items-center text-sm text-black dark:text-white font-medium",
                "sm:text-lg sm:leading-13 sm:px-0",
              )}
            >
              <LangugeToggle label={menuItem.text} linksOpened={linksOpened} />
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown className="shadow-lg">{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Anchor
        key={menuItem.url}
        component={Link}
        href={menuItem.url}
        className={cn(
          "flex items-center w-full h-11 px-4",
          "text-sm text-black dark:text-white font-medium",
          "sm:w-auto sm:h-full sm:px-0",
        )}
      >
        {menuItem.text}
      </Anchor>
    );
  });

  return (
    <header className="absolute w-full z-10 motion-safe:animate-slide">
      <Container className="h-16 sm:h-19.5">
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
            {/* {user?.ok ? (
              <LogoutForm />
            ) : (
              <Link href="/signin" className="hidden sm:block">
                <IconLogin stroke={2} />
              </Link>
            )} */}
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
                className={
                  "flex items-center w-full h-11 px-4 text-black dark:text-white"
                }
              >
                <LangugeToggle label={labels[lang]} linksOpened={linksOpened} />
              </UnstyledButton>
              <Collapse in={linksOpened}>{languageButtons}</Collapse>
              {/* <Link
                href="/signin"
                className="flex items-center w-full h-11 px-4"
              >
                <IconLogin stroke={2} />
              </Link> */}
            </ScrollArea>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </header>
  );
}
