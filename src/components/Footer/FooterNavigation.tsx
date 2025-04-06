"use client";

import { ScrollTopButton } from "#components/ui/ScrollTopButton";
import { Footer } from "#types/payload";
import Link from "next/link";
import type { LocaleParams } from "#i18n-config";
import { usePathname, useParams } from "next/navigation";
import { Container } from "#components/Container/Container";
import { Text } from "#components/ui/Text";

interface FooterNavigationProps {
  navigation: NonNullable<Footer["navigation"]>;
}

export const FooterNavigation = (props: FooterNavigationProps) => {
  const { navigation } = props;
  const pathName = usePathname();
  const { lang } = useParams<LocaleParams>();

  return (
    <Container>
      <div className="border-t border-foreground pt-14 pb-16 sm:pb-24">
        <Text className="mb-6 sm:mb-8">{navigation.title}</Text>

        <div className="sm:flex sm:items-center sm:justify-between">
          <nav className="mb-10 flex flex-col gap-6 sm:mb-0 sm:flex-row">
            {navigation.navItems?.map(({ link }) => (
              <Link
                key={link.label}
                href={
                  link.url?.includes("contact")
                    ? `${pathName}${link.url}`
                    : `/${lang}${link.url}`
                }
                className="text-xl sm:text-3xl"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {navigation.topButton && (
            <ScrollTopButton title={navigation.topButton} />
          )}
        </div>
      </div>
    </Container>
  );
};
