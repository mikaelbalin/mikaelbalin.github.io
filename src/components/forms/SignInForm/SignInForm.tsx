"use client";

import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import Link from "next/link";
import React from "react";

export function SigninForm() {
  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <TextInput label="Email" placeholder="you@mantine.dev" required />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        required
        mt="md"
      />
      <Group justify="space-between" mt="lg">
        <Checkbox label="Remember me" />
        <Anchor component="button" size="sm">
          Forgot password?
        </Anchor>
      </Group>
      <Button fullWidth mt="xl">
        Sign in
      </Button>
    </Paper>
  );
}
