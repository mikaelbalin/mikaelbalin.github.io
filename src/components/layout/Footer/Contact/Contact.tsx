import { Container, Grid, Text, GridCol } from "@mantine/core";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactProps } from "@/types/data";

export const Contact = (props: ContactProps) => {
  const { contacts, social, form } = props;

  return (
    <Container id="contacts" className="pb-14 sm:pb-18">
      <Grid>
        <GridCol span={{ base: 12, sm: 6 }} className="mb-14">
          <Grid>
            <GridCol
              span={{ base: 12, lg: 6 }}
              className="flex flex-col gap-6 mb-10"
            >
              <Text>{contacts.title}</Text>
              <Text component="a" size="xl" href={`mailto:${contacts.email}`}>
                {contacts.email}
              </Text>
              <Text component="a" size="xl" href={`tel:${contacts.phone}`}>
                {contacts.phone}
              </Text>
            </GridCol>

            <GridCol span={{ base: 12, lg: 6 }} className="flex flex-col gap-6">
              <Text>{social.title}</Text>
              {social.socialLink.map((link) => (
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
          <Text className="mb-8">{form.title}</Text>
          <ContactForm {...form} />
        </GridCol>
      </Grid>
    </Container>
  );
};
