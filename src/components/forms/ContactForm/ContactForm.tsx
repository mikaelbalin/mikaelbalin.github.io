"use client";

import { ContactFormProps } from "@/types/data";
import { TextInput, Checkbox, Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

export const ContactForm = (props: ContactFormProps) => {
  const { name, message, email } = props;

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      message: "",
      termsOfService: false,
    },
    validate: {
      name: (value) => (value?.trim().length > 0 ? null : "Name is required"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
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
        />

        <Checkbox
          label="I agree to sell my privacy"
          key={form.key("termsOfService")}
          {...form.getInputProps("termsOfService", { type: "checkbox" })}
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
