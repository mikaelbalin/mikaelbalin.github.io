import { Container, Grid, Text, GridCol } from "@mantine/core";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactProps } from "@/types/data";

export const Contact = (props: ContactProps) => {
  const { contactsTitle, email, phone, socialTitle, socialLink, formTitle } =
    props;

  return (
    <Container id="contacts" className="pb-14 sm:pb-18">
      <Grid>
        <GridCol span={{ base: 12, sm: 6 }} className="mb-14">
          <Grid>
            <GridCol
              span={{ base: 12, lg: 6 }}
              className="flex flex-col gap-6 mb-10"
            >
              <Text>{contactsTitle}</Text>
              <Text component="a" size="xl" href={`mailto:${email}`}>
                {email}
              </Text>
              <Text component="a" size="xl" href={`tel:${phone}`}>
                {phone}
              </Text>
            </GridCol>

            <GridCol span={{ base: 12, lg: 6 }} className="flex flex-col gap-6">
              <Text>{socialTitle}</Text>
              {socialLink.map((link) => (
                <Text
                  component="a"
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="xl"
                >
                  {link.text}
                </Text>
              ))}
            </GridCol>
          </Grid>
        </GridCol>

        <GridCol span={{ base: 12, sm: 6 }}>
          <Text className="mb-8">{formTitle}</Text>
          <ContactForm />
        </GridCol>
      </Grid>
    </Container>
  );
};
