"use client";

import { useState } from "react";
import { subscriptionSchema } from "@/lib/schemas";
import { FormBlock } from "@/types/payload";
import { Button, Grid, GridCol } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { buildInitialFormState } from "@/lib/buildInitialFormState";
import { fields } from "@/components/forms/fields";
import { isValidForm } from "@/lib/isValidForm";

type SubscriptionFormProps = FormBlock;

export const SubscriptionForm = (props: SubscriptionFormProps) => {
  const { form: formFromProps } = props;

  if (!isValidForm(formFromProps)) {
    throw new Error("Invalid form configuration provided");
  }

  const { id, submitButtonLabel } = formFromProps;

  const formID = String(id);
  const initialValues = buildInitialFormState(formFromProps.fields);

  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: initialValues,
    validate: zodResolver(subscriptionSchema),
  });

  const handleError = (errors: typeof form.errors) => {
    notifications.show({
      title: "Subscription error",
      message: errors.email,
      color: "red",
    });
  };

  const handleSubmit = async (values: typeof initialValues) => {
    if (values) {
      const dataToSend = Object.entries(values).map(([name, value]) => ({
        field: name,
        value,
      }));

      setIsLoading(true);

      try {
        const response = await fetch("/api/form", {
          body: JSON.stringify({
            form: formID,
            submissionData: dataToSend,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });

        const json = await response.json();

        if (!response.ok) {
          setIsLoading(false);

          notifications.show({
            title: `Subscription error: ${response.status}`,
            message: json.error || "Internal Server Error",
            color: "red",
          });

          return;
        }

        setIsLoading(false);
        setHasSubmitted(true);
        notifications.show({
          title: "Thank you!",
          message: "You have successfully subscribed to newsletter.",
          color: "green",
        });
      } catch (error) {
        setIsLoading(false);
        notifications.show({
          title: "Subscription error",
          message: error instanceof Error ? error.message : "An error occurred",
          color: "red",
        });
      }
    }
  };

  return (
    <form
      id={formID}
      onSubmit={form.onSubmit(handleSubmit, handleError)}
      autoComplete="on"
    >
      <Grid className="mt-8 sm:mt-14">
        <GridCol
          span={{ base: 12, sm: 8, lg: 7 }}
          className="sm:flex items-end"
        >
          {formFromProps?.fields?.map((field) => {
            const Field = fields?.[field.blockType];
            if (Field && "name" in field) {
              const {
                onChange,
                checked,
                defaultValue,
                onBlur,
                onFocus,
                value,
              } = form.getInputProps(field.name);

              return (
                <Field
                  key={form.key(field.name)}
                  label={field.label}
                  className="w-full"
                  variant="filled"
                  onChange={onChange}
                  checked={checked}
                  defaultValue={defaultValue}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  value={value}
                />
              );
            }
            return null;
          })}

          <Button
            form={formID}
            type="submit"
            size="xs"
            className="w-full sm:w-auto shrink-0"
            disabled={hasSubmitted}
            loading={isLoading}
          >
            {submitButtonLabel}
          </Button>
        </GridCol>
      </Grid>
    </form>
  );
};
