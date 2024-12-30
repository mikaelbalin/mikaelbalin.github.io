"use client";

import { subscribeAction } from "@/data/actions/subscription-actions";
import { subscriptionSchema, SubscriptionSchema } from "@/lib/schemas";
import { Button, Grid, GridCol, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

export const SubscriptionForm = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const form = useForm<SubscriptionSchema>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },
    validate: zodResolver(subscriptionSchema),
  });

  const handleError = (errors: typeof form.errors) => {
    notifications.show({
      title: "Subscription error",
      message: errors.email,
      color: "red",
    });
  };

  const handleSubmit = async (values: SubscriptionSchema) => {
    const result = await subscribeAction(values);

    if (result?.errors) {
      form.setErrors(result.errors);
    }

    if (result?.strapiError) {
      notifications.show({
        title: result.strapiError.name,
        message: result.strapiError.message,
        color: "red",
      });
    } else {
      notifications.show({
        title: "Thank you!",
        message: result?.message,
        color: "green",
      });
      setIsSubscribed(true);
    }
  };

  const { onChange, checked, defaultValue, onBlur, onFocus, value } =
    form.getInputProps("email");

  return (
    <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
      <Grid className="mt-8 sm:mt-14">
        <GridCol
          span={{ base: 12, sm: 8, lg: 7 }}
          className="sm:flex items-end"
        >
          <TextInput
            label="Email"
            className="w-full"
            variant="filled"
            onChange={onChange}
            checked={checked}
            defaultValue={defaultValue}
            onBlur={onBlur}
            onFocus={onFocus}
            value={value}
          />

          <Button
            type="submit"
            size="xs"
            className="w-full sm:w-auto shrink-0"
            disabled={isSubscribed}
          >
            Submit
          </Button>
        </GridCol>
      </Grid>
    </form>
  );
};
