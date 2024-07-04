"use client";

// import { TextInput, Checkbox, Button, Group, Textarea } from "@mantine/core";
// import { useForm } from "@mantine/form";

export const ContactForm = () => {
  // const form = useForm({
  //   mode: "uncontrolled",
  //   initialValues: {
  //     name: "",
  //     email: "",
  //     message: "",
  //     termsOfService: false,
  //   },
  //   validate: {
  //     name: (value) => (value?.trim().length > 0 ? null : "Name is required"),
  //     email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
  //   },
  // });

  return (
    <>
      {/* <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
          mt="md"
          label="I agree to sell my privacy"
          key={form.key("termsOfService")}
          {...form.getInputProps("termsOfService", { type: "checkbox" })}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit message</Button>
        </Group>
      </form> */}
    </>
  );
};
