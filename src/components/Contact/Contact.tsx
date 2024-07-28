import { Container, Grid, Text, GridCol } from "@mantine/core";
import { ContactForm } from "../forms/ContactForm";
import { ContactProps } from "../../types/data";
import Link from "next/link";

export const Contact = (props: ContactProps) => {
  const { contactsTitle, email, phone, socialTitle, socialLink, formTitle } =
    props;
  return (
    <Container mt={64} mb={56} id="contacts">
      <Grid>
        <GridCol span={{ base: 12, sm: 3 }}>
          <Text>{contactsTitle}</Text>
          <Text>{email}</Text>
          <Text>{phone}</Text>
        </GridCol>
        <GridCol span={{ base: 12, sm: 3 }}>
          <Text>{socialTitle}</Text>
          {socialLink.map((link) => {
            return (
              <Link
                key={link.id}
                href={link.url}
                className="block"
                target="_blank"
              >
                {link.text}
              </Link>
            );
          })}
        </GridCol>
        <GridCol span={{ base: 12, sm: 6 }}>
          <Text>{formTitle}</Text>
          <ContactForm />
        </GridCol>
      </Grid>
    </Container>
  );
};
