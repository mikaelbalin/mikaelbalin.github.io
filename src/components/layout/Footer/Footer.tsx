import { Container, Group, Anchor } from "@mantine/core";
import { Contact } from "@/components/layout/Footer/Contact";
import { FooterProps } from "@/types/data";

const links = [
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Blog" },
  { link: "#", label: "Careers" },
];

export function Footer(props: FooterProps) {
  const {
    contactsTitle,
    email,
    phone,
    socialTitle,
    socialLink,
    formTitle,
    scrollTexts,
  } = props;
  const items = links.map((link) => (
    <Anchor<"a"> c="dimmed" key={link.label} href={link.link} size="sm">
      {link.label}
    </Anchor>
  ));

  return (
    <footer>
      <Contact
        contactsTitle={contactsTitle}
        email={email}
        phone={phone}
        socialTitle={socialTitle}
        socialLink={socialLink}
        formTitle={formTitle}
      />
      <Container className="flex items-center justify-between flex-col xs:flex-row py-8">
        Content
        <Group className="mt-4 xs:mt-0">{items}</Group>
      </Container>
    </footer>
  );
}