"use client";

import { Box, Button, SimpleGrid, TextInput } from "@mantine/core";
import { useField } from "@mantine/form";

export const SubscriptionForm = () => {
  const field = useField({
    initialValue: "",
    validate: (value) =>
      value.trim().length < 2 ? "Value is too short" : null,
  });

  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} className="mt-8 sm:mt-14">
      <Box className="flex items-end">
        <TextInput
          {...field.getInputProps()}
          label="Email"
          placeholder="email@example.com"
          className="sm:w-full"
        />
        <Button onClick={field.validate} className="shrink-0">
          Submit
        </Button>
      </Box>
    </SimpleGrid>
  );
};
