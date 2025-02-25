import { Container, Grid, Text, GridCol } from "@mantine/core";
import { ContactForm } from "@/components/forms/ContactForm";
import { Footer as FooterProps } from "@/types/payload";
import { Phone } from "./Phone";

type ContactProps = {
  contacts: FooterProps["contacts"];
  social: FooterProps["social"];
  form: FooterProps["form"];
};

export const Contact = (props: ContactProps) => {
  const { contacts, social, form } = props;

  return (
    <Container id="contact" className="pb-14 sm:pb-18">
      <Grid>
        <GridCol span={{ base: 12, sm: 6 }} className="mb-14">
          <Grid>
            {contacts && (
              <GridCol
                span={{ base: 12, xl: 6 }}
                className="flex flex-col gap-6 mb-10"
              >
                <Text>{contacts.title}</Text>
                <Text component="a" size="xl" href={`mailto:${contacts.email}`}>
                  {contacts.email}
                </Text>
                {contacts.phone && <Phone phone={contacts.phone} />}
              </GridCol>
            )}

            {social && (
              <GridCol
                span={{ base: 12, xl: 6 }}
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

          {Array.isArray(form) && form.length > 0 && (
            <ContactForm {...form[0]} />
          )}
        </GridCol>
      </Grid>
    </Container>
  );
};
