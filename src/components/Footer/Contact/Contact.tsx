import { ContactForm } from "#components/forms/ContactForm";
import { Footer as FooterProps } from "#types/payload";
import { Phone } from "./Phone";
import { Container } from "#components/Container";
import { Text } from "#components/ui/Text";
import Link from "next/link";

type ContactProps = {
  contacts: FooterProps["contacts"];
  social: FooterProps["social"];
  form: FooterProps["form"];
};

export const Contact = (props: ContactProps) => {
  const { contacts, social, form } = props;

  return (
    <Container id="contact" className="pb-14 sm:pb-18">
      <div className="flex flex-col gap-14 sm:grid sm:grid-cols-2 sm:gap-4">
        <div className="flex flex-col gap-10 xl:grid xl:grid-cols-2 xl:gap-4">
          {contacts && (
            <div className="flex flex-col gap-6">
              <Text>{contacts.title}</Text>
              <Link
                href={`mailto:${contacts.email}`}
                className="text-xl sm:text-3xl"
              >
                {contacts.email}
              </Link>
              {contacts.phone && <Phone phone={contacts.phone} />}
            </div>
          )}

          {social && (
            <div className="flex flex-col gap-6">
              <Text>{social.title}</Text>
              {social.socialItems?.map(({ id, link }) => (
                <Link
                  key={id}
                  href={link.url || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl sm:text-3xl"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="w-full">
          <Text className="mb-8">Send me a message</Text>
          {Array.isArray(form) && form.length > 0 && (
            <ContactForm {...form[0]} />
          )}
        </div>
      </div>
    </Container>
  );
};
