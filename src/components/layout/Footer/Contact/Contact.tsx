import { Container, Grid, Text, GridCol } from "@mantine/core";
import { ContactForm } from "@/components/forms/ContactForm";
import { Footer as FooterProps } from "@/payload-types";

type ContactProps = {
  contacts: FooterProps["contacts"];
  social: FooterProps["social"];
};

export const Contact = (props: ContactProps) => {
  const { contacts, social } = props;

  return (
    <Container id="contact" className="pb-14 sm:pb-18">
      <Grid>
        <GridCol span={{ base: 12, sm: 6 }} className="mb-14">
          <Grid>
            {contacts && (
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
            )}

            {social && (
              <GridCol
                span={{ base: 12, lg: 6 }}
                className="flex flex-col gap-6"
              >
                <Text>{social.title}</Text>
                {social.socialItems?.map(({ id, link }) => (
                  <Text
                    component="a"
                    key={id}
                    href={link.url || ""}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="xl"
                  >
                    {link.label}
                  </Text>
                ))}
              </GridCol>
            )}
          </Grid>
        </GridCol>

        <GridCol span={{ base: 12, sm: 6 }}>
          <Text className="mb-8">Send me a message </Text>
          <ContactForm />
        </GridCol>
      </Grid>
    </Container>
  );
};
