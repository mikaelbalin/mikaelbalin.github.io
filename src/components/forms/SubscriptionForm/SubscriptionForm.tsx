"use client";

import { SubscriptionFormProps } from "@/types/data";
import { Button, Grid, GridCol, TextInput } from "@mantine/core";
import { useField } from "@mantine/form";

export const SubscriptionForm = (props: SubscriptionFormProps) => {
  const { email, button } = props;
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
          label={email.label}
          placeholder={email.placeholder}
          className="w-full"
          variant="filled"
        />

        <Button
          onClick={field.validate}
          size="xs"
          className="w-full sm:w-auto shrink-0"
        >
          {button}
        </Button>
      </GridCol>
    </Grid>
  );
};
