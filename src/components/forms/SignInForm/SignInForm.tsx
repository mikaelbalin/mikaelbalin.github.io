"use client";

import { signinSchema, SigninSchema } from "@/lib/schemas";
import {
  Anchor,
  Button,
  Checkbox,
  Grid,
  GridCol,
  Group,
  Paper,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import React from "react";

export function SigninForm() {
  const form = useForm<SigninSchema>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(signinSchema),
  });

  const handleError = (errors: typeof form.errors) => {
    const firstErrorPath = Object.keys(errors)[0];
    form.getInputNode(firstErrorPath)?.focus();
  };

  return (
    <Paper withBorder shadow="md" className="p-8 text-left">
      <form
        onSubmit={form.onSubmit((values) => console.log(values), handleError)}
      >
        <TextInput
          withAsterisk
          label="Email"
          placeholder="you@email.com"
          key={form.key("email")}
          {...form.getInputProps("email")}
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          key={form.key("password")}
          {...form.getInputProps("password")}
          required
          mt="md"
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" type="submit">
          Sign in
        </Button>
      </form>
    </Paper>
  );
}
