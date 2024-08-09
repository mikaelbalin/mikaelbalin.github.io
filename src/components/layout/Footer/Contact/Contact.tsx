import { Container, Grid, Text, GridCol } from "@mantine/core";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactProps } from "@/types/data";
import Link from "next/link";
import { Marquee } from "@/components/ui/Marquee";

export const Contact = (props: ContactProps) => {
  const { contactsTitle, email, phone, socialTitle, socialLink, formTitle } =
    props;

  return (
    <>
      <Marquee
        texts={[
          "Vamos manter Lass uns verbinden",
          "Lets's connect",
          "Vamos nos conectar en contact",
        ]}
      />
      <Marquee
        texts={["Vamos nos conectar", "Conectémonos", "Judte hain ala itisal"]}
      />
      <Container id="contacts" className="mt-17 mb-14">
        <Grid>
          <GridCol span={{ base: 12, sm: 6 }}>
            <Grid>
              <GridCol span={{ base: 12, md: 6 }}>
                <Text>{contactsTitle}</Text>
                <Text>{email}</Text>
                <Text>{phone}</Text>
              </GridCol>
              <GridCol span={{ base: 12, md: 6 }}>
                <Text>{socialTitle}</Text>
                {socialLink.map((link) => (
                  <Link
                    key={link.id}
                    href={link.url}
                    className="block"
                    target="_blank"
                  >
                    {link.text}
                  </Link>
                ))}
              </GridCol>
            </Grid>
          </GridCol>
          <GridCol span={{ base: 12, sm: 6 }}>
            <Text>{formTitle}</Text>
            <ContactForm />
          </GridCol>
        </Grid>
      </Container>
    </>
  );
};
