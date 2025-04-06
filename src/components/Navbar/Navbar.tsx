"use client";

import { Burger } from "#components/Burger";
import { Container } from "#components/Container";
import { ModeToggle } from "#components/ModeToggle";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "#components/ui/Collapsible";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "#components/ui/Sheet";
import { useDisclosure } from "@kaelui/hooks/useDisclosure";
import Link from "next/link";
import { i18n, Locale, LocaleParams } from "#i18n-config";
import { cn } from "#lib/utils";
import { useParams, usePathname } from "next/navigation";
import { UnstyledButton } from "#components/ui/UnstyledButton";
import { IconChevronDown } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#components/ui/DropdownMenu";
import { Header } from "#types/payload";

const labels: Record<Locale, string> = {
  en: "English",
  pt: "Portugais",
};

const languageMenuItems = i18n.locales.map((locale) => ({
  url: locale,
  label: labels[locale],
}));

const redirectedPathName = (pathName: string, locale: "en" | "pt") => {
  const segments = pathName.split("/");
  segments[1] = locale;
  return segments.join("/");
};

type NavbarProps = Header;

export const Navbar = ({ logo, navItems }: NavbarProps) => {
  const [sheetOpen, { toggle: toggleSheet, close: closeSheet }] =
    useDisclosure(false);

  const [dropdownOpen, { toggle: toggleDropdown }] = useDisclosure(false);
  const [collapsibleOpen, { toggle: toggleCollapsible }] = useDisclosure(false);

  const pathName = usePathname();
  const { lang = "en" } = useParams<LocaleParams>();

  // Mobile language menu items
  const languageButtons = languageMenuItems.map((item) => (
    <Link
      key={item.label}
      className={cn("flex w-full items-center text-sm")}
      onClick={closeSheet}
      href={redirectedPathName(pathName, item.url)}
    >
      {item.label}
    </Link>
  ));

  return (
    <Sheet open={sheetOpen}>
      <Container
        asChild
        className="sm:h-19.5 pointer-events-auto relative z-50 flex h-16 items-center gap-x-8 sm:gap-x-4"
      >
        <nav>
          <Link
            href={`/${lang}${logo.link.url}`}
            className="mr-auto text-sm sm:text-lg"
          >
            {logo.link.label}
          </Link>

          <div className="hidden sm:flex sm:gap-4">
            {navItems?.map(({ link }) => (
              <Link
                key={link.label}
                href={`/${lang}${link.url}`}
                aria-current={
                  pathName === `/${lang}${link.url}` ? "page" : undefined
                }
                className="text-lg sm:px-4 sm:py-2"
              >
                {link.label}
              </Link>
            ))}
            <DropdownMenu open={dropdownOpen} onOpenChange={toggleDropdown}>
              <DropdownMenuTrigger asChild>
                <UnstyledButton
                  className={cn("flex items-center text-lg sm:px-4 sm:py-2")}
                >
                  <span className="mr-1">{labels[lang]}</span>
                  <IconChevronDown
                    className={cn(
                      "size-6",
                      dropdownOpen ? "rotate-180" : "rotate-0",
                    )}
                  />
                </UnstyledButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languageMenuItems.map((item) => (
                  <DropdownMenuItem key={item.label} asChild>
                    <Link
                      className={cn("cursor-pointer")}
                      href={redirectedPathName(pathName, item.url)}
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <ModeToggle />

          {/* Mobile menu button*/}
          <Burger
            opened={sheetOpen}
            onClick={toggleSheet}
            className="sm:hidden"
          />
        </nav>
      </Container>

      <SheetContent
        side="top"
        className="sm:hidden"
        overlayClassName="sm:hidden"
        onInteractOutside={(event) => {
          event.preventDefault();
          if (!(event.target instanceof HTMLElement)) return;
          if (event.target.getAttribute("data-slot") === "sheet-overlay") {
            closeSheet();
          }
        }}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Mobile site navigation menu</SheetTitle>
          <SheetDescription>
            Use this menu to navigate between main sections of the website:
            Home, Blog, and Contacts
          </SheetDescription>
        </SheetHeader>

        <nav className="mt-16 flex flex-col gap-6 px-4 py-10">
          {navItems?.map(({ link }) => (
            <Link
              key={link.label}
              href={`/${lang}${link.url}`}
              aria-current={
                pathName === `/${lang}${link.url}` ? "page" : undefined
              }
              className="text-sm"
            >
              {link.label}
            </Link>
          ))}
          <Collapsible open={collapsibleOpen} onOpenChange={toggleCollapsible}>
            <CollapsibleTrigger
              className={cn("mb-6 flex w-full items-center text-sm")}
            >
              <span className="mr-1">{labels[lang]}</span>
              <IconChevronDown
                className={cn(
                  "size-4",
                  collapsibleOpen ? "rotate-180" : "rotate-0",
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col gap-4 pl-4">
              {languageButtons}
            </CollapsibleContent>
          </Collapsible>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
