"use client";

import { contactFormSchema } from "@/lib/schemas";
import { ContactFormProps } from "@/types/data";
import { TextInput, Checkbox, Button, Group, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import Link from "next/link";

export const ContactForm = (props: ContactFormProps) => {
  const { name, message, email } = props;

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      message: "",
      termsOfService: false,
      subscribeToNewsletter: false,
    },
    validate: zodResolver(contactFormSchema),
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <div className="flex flex-col gap-6">
        <TextInput
          withAsterisk
          label={name.label}
          placeholder={name.placeholder}
          key={form.key("name")}
          {...form.getInputProps("name")}
        />

        <TextInput
          withAsterisk
          label={email.label}
          placeholder={email.placeholder}
          key={form.key("email")}
          {...form.getInputProps("email")}
        />

        <Textarea
          withAsterisk
          label={message.label}
          placeholder={message.placeholder}
          key={form.key("message")}
          {...form.getInputProps("message")}
          resize="vertical"
        />

        <Checkbox
          label={
            <>
              I agree to the terms of service and{" "}
              <Link href="/privacy">privacy policy</Link>
            </>
          }
          key={form.key("termsOfService")}
          {...form.getInputProps("termsOfService", { type: "checkbox" })}
        />

        <Checkbox
          label="Also subscribe me to your newsletter"
          key={form.key("subscribeToNewsletter")}
          {...form.getInputProps("subscribeToNewsletter", { type: "checkbox" })}
        />
      </div>

      <Group className="mt-8 justify-end">
        <Button type="submit" size="xs">
          Submit message
        </Button>
      </Group>
    </form>
  );
};
