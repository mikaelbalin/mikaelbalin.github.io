"use client";

import { Button, Paper, PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";

export function SignupForm() {
  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <TextInput label="User name" placeholder="username" required />
      <TextInput label="Email" placeholder="you@mantine.dev" required mt="md" />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        required
        mt="md"
      />
      <Button fullWidth mt="xl">
        Sign up
      </Button>
    </Paper>
  );
}
