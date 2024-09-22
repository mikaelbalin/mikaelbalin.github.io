import { Container, Box, Text } from "@mantine/core";
import { Contact } from "@/components/layout/Footer/Contact";
import { Marquee } from "@/components/ui/Marquee";
import { FooterProps } from "@/types/data";
import Link from "next/link";
import { ScrollTopButton } from "@/components/ui/ScrollTopButton";

const links = [
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Blog" },
  { link: "#", label: "Careers" },
];

export function Footer(props: FooterProps) {
  const { titles, contacts, social, form } = props;

  return (
    <footer>
      <Marquee texts={titles} />

      <Contact contacts={contacts} social={social} form={form} />

      <Container>
        <Box className="border-t border-black dark:border-white pt-14 pb-16 sm:pb-24">
          <Text className="mb-6 sm:mb-8">Content</Text>

          <div className="flex flex-col gap-6 items-start sm:flex-row">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.link}
                className="text-xl leading-7 sm:text-2xl"
              >
                {link.label}
              </Link>
            ))}

            <ScrollTopButton className="mt-4 sm:mt-0 sm:ml-auto" />
          </div>
        </Box>
      </Container>
    </footer>
  );
}
