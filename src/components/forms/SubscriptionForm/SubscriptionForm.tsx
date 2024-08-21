"use client";

import { Button, Grid, GridCol, TextInput } from "@mantine/core";
import { useField } from "@mantine/form";

export const SubscriptionForm = () => {
  const field = useField({
    initialValue: "",
    validate: (value) =>
      value.trim().length < 2 ? "Value is too short" : null,
  });

  return (
    <Grid className="mt-8 sm:mt-14">
      <GridCol span={{ base: 12, sm: 8, lg: 7 }} className="sm:flex items-end">
        <TextInput
          {...field.getInputProps()}
          label="Email"
          placeholder="email@example.com"
          className="w-full"
          variant="filled"
        />

        <Button onClick={field.validate} className="w-full sm:w-auto shrink-0">
          Submit
        </Button>
      </GridCol>
    </Grid>
  );
};
