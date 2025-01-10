"use client";

import { contactFormSchema } from "@/lib/schemas";
import { Button, Group } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { FormBlock } from "@/types/payload";
import { isValidForm } from "@/lib/isValidForm";
import { buildInitialFormState } from "@/lib/buildInitialFormState";
import { useState } from "react";
import { fields } from "@/components/forms/fields";

type ContactFormProps = FormBlock;

export const ContactForm = (props: ContactFormProps) => {
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
    validate: zodResolver(contactFormSchema),
  });

  const handleError = (errors: typeof form.errors) => {
    const firstErrorPath = Object.keys(errors)[0];
    form.getInputNode(firstErrorPath)?.focus();
  };

  const handleSubmit = async (values: typeof initialValues) => {
    if (values) {
      const dataToSend = Object.entries(values).map(([name, value]) => ({
        field: name,
        value,
      }));

      setIsLoading(true);

      try {
        const req = await fetch("/next/form", {
          body: JSON.stringify({
            form: formID,
            submissionData: dataToSend,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });

        const res = await req.json();

        if (req.status >= 400) {
          setIsLoading(false);

          notifications.show({
            title: `Form submit error: ${res.status}`,
            message: res.errors?.[0]?.message || "Internal Server Error",
            color: "red",
          });

          return;
        }

        setIsLoading(false);
        setHasSubmitted(true);
        notifications.show({
          title: "Thank you!",
          message: "I'll get back to you as soon as possible",
          color: "green",
        });
      } catch (error) {
        setIsLoading(false);
        notifications.show({
          title: "Form submit error",
          message: error instanceof Error ? error.message : "An error occurred",
          color: "red",
        });
      }
    }
  };

  return (
    <form id={formID} onSubmit={form.onSubmit(handleSubmit, handleError)}>
      <div className="flex flex-col gap-6">
        {formFromProps?.fields?.map((field) => {
          const Field = fields?.[field.blockType];
          if (Field && "name" in field) {
            return field.blockType === "checkbox" ? (
              <Field
                key={form.key(field.name)}
                label={field.label}
                {...form.getInputProps(field.name, {
                  type: "checkbox",
                })}
              />
            ) : field.blockType === "textarea" ? (
              <Field
                withAsterisk
                key={form.key(field.name)}
                label={field.label}
                {...form.getInputProps(field.name)}
                resize="vertical"
              />
            ) : (
              <Field
                withAsterisk
                key={form.key(field.name)}
                label={field.label}
                {...form.getInputProps(field.name)}
              />
            );
          }
          return null;
        })}
      </div>

      <Group className="mt-8 justify-end">
        <Button
          form={formID}
          type="submit"
          size="xs"
          disabled={hasSubmitted}
          loading={isLoading}
        >
          {submitButtonLabel}
        </Button>
      </Group>
    </form>
  );
};
