"use client";

import { registerUserAction } from "@/data/actions/auth-actions";
import { Button, Paper, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export interface SignupFormValues {
  username: string;
  email: string;
  password: string;
}

export function SignupForm() {
  const form = useForm<SignupFormValues>({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate: {
      username: (value) =>
        value?.trim().length > 0 ? null : "Name is required",
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value?.trim().length > 0 ? null : "Password is required",
    },
  });

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <form onSubmit={form.onSubmit(registerUserAction)}>
        <TextInput
          withAsterisk
          label="User name"
          placeholder="username"
          key={form.key("username")}
          {...form.getInputProps("username")}
          required
        />
        <TextInput
          withAsterisk
          label="Email"
          placeholder="you@email.com"
          key={form.key("email")}
          {...form.getInputProps("email")}
          required
          mt="md"
        />
        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="Your password"
          key={form.key("password")}
          {...form.getInputProps("password")}
          required
          mt="md"
        />
        <Button fullWidth mt="xl" type="submit">
          Sign up
        </Button>
      </form>
    </Paper>
  );
}
