"use client";

import { loginUserAction } from "@/data/actions/auth-actions";
import { signinSchema, SigninSchema } from "@/lib/schemas";
import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import React from "react";

export function SigninForm() {
  const form = useForm<SigninSchema>({
    mode: "uncontrolled",
    initialValues: {
      identifier: "",
      password: "",
    },
    validate: zodResolver(signinSchema),
  });

  const handleError = (errors: typeof form.errors) => {
    const firstErrorPath = Object.keys(errors)[0];
    form.getInputNode(firstErrorPath)?.focus();
  };

  const handleSubmit = async (values: SigninSchema) => {
    const result = await loginUserAction(values);

    if (result?.errors) {
      form.setErrors(result.errors);
    }

    if (result?.strapiError) {
      notifications.show({
        title: result.strapiError.name,
        message: result.strapiError.message,
      });
    }
  };

  return (
    <Paper withBorder className="p-8 text-left shadow-lg">
      <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
        <TextInput
          withAsterisk
          label="Username or email"
          placeholder="you@email.com"
          key={form.key("identifier")}
          {...form.getInputProps("identifier")}
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
