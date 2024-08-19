"use client";

import { TextInput, Checkbox, Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

export const ContactForm = () => {
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
          label="Name"
          placeholder="John Doe"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />

        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />

        <Textarea
          withAsterisk
          label="Message"
          placeholder="Your message"
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
        <Button type="submit">Submit message</Button>
      </Group>
    </form>
  );
};
