"use client";

import { Button, TextInput, Box } from "@mantine/core";
import { useField } from "@mantine/form";

export const SubscriptionForm = () => {
  const field = useField({
    initialValue: "",
    validate: (value) =>
      value.trim().length < 2 ? "Value is too short" : null,
  });

  return (
    <Box mt={32}>
      <TextInput
        {...field.getInputProps()}
        label="Name"
        placeholder="Enter your name"
        mb="md"
      />
      <Button onClick={field.validate}>Validate</Button>
    </Box>
  );
};
