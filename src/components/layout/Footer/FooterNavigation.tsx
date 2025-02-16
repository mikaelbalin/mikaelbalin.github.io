"use client";

import { ScrollTopButton } from "@/components/ui/ScrollTopButton";
import { Footer } from "@/types/payload";
import { Box, Text, Container } from "@mantine/core";
import Link from "next/link";
import type { LocaleParams } from "@/i18n-config";
import { usePathname, useParams } from "next/navigation";

interface FooterNavigationProps {
  navigation: NonNullable<Footer["navigation"]>;
}

export const FooterNavigation = (props: FooterNavigationProps) => {
  const { navigation } = props;
  const pathName = usePathname();
  const { lang } = useParams<LocaleParams>();

  return (
    <Container>
      <Box className="border-t border-black dark:border-white pt-14 pb-16 sm:pb-24">
        <Text className="mb-6 sm:mb-8">{navigation.title}</Text>

        <nav className="flex flex-col gap-6 items-start sm:flex-row">
          {navigation.navItems?.map(({ link }) => (
            <Link
              key={link.label}
              href={
                link.url?.includes("contact")
                  ? `${pathName}${link.url}`
                  : `/${lang}${link.url}`
              }
              className="text-xl leading-7 sm:text-2xl"
            >
              {link.label}
            </Link>
          ))}

          {navigation.topButton && (
            <ScrollTopButton
              className="mt-4 sm:mt-0 sm:ml-auto"
              title={navigation.topButton}
            />
          )}
        </nav>
      </Box>
    </Container>
  );
};
