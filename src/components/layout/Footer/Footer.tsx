import { Container, Box, Text } from "@mantine/core";
import { Contact } from "@/components/layout/Footer/Contact";
import { Marquee } from "@/components/ui/Marquee";
import Link from "next/link";
import { ScrollTopButton } from "@/components/ui/ScrollTopButton";
import { Footer as FooterProps } from "@/types/payload";

export function Footer(props: FooterProps) {
  const { titles, contacts, social, navigation } = props;

  return (
    <footer>
      <Marquee texts={titles} />

      <Contact contacts={contacts} social={social} />

      {navigation && (
        <Container>
          <Box className="border-t border-black dark:border-white pt-14 pb-16 sm:pb-24">
            <Text className="mb-6 sm:mb-8">{navigation.title}</Text>

            <div className="flex flex-col gap-6 items-start sm:flex-row">
              {navigation.navItems?.map(({ link }) => (
                <Link
                  key={link.label}
                  href={link.url || ""}
                  className="text-xl leading-7 sm:text-2xl"
                >
                  {link.label}
                </Link>
              ))}

              <ScrollTopButton
                className="mt-4 sm:mt-0 sm:ml-auto"
                title={navigation.topButton || ""}
              />
            </div>
          </Box>
        </Container>
      )}
    </footer>
  );
}
