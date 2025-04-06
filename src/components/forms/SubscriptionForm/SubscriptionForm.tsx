"use client";

import { FormBlock } from "#types/payload";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "#components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "#components/ui/Form";
import {
  subscriptionSchema,
  SubscriptionSchema,
} from "#components/forms/schemas";
import { isValidForm } from "#lib/isValidForm";
import { buildInitialFormState } from "#lib/buildInitialFormState";
import { useState } from "react";
import { toast } from "sonner";
import { fields } from "#components/forms/fields";
import { IconLoader2 } from "@tabler/icons-react";

type SubscriptionFormProps = FormBlock;

export const SubscriptionForm = ({
  form: formProps,
}: SubscriptionFormProps) => {
  if (!isValidForm(formProps)) {
    throw new Error("Invalid form configuration provided");
  }

  const { id, submitButtonLabel } = formProps;
  const formID = String(id);
  const defaultValues = buildInitialFormState(formProps.fields);

  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const form = useForm<SubscriptionSchema>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<SubscriptionSchema> = async (values) => {
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

          toast(
            `Subscription error: ${response.status} - ${json.error || "Internal Server Error"}`,
          );

          return;
        }

        setIsLoading(false);
        setHasSubmitted(true);

        toast(
          `Subscription successful: ${json.message || "You have successfully subscribed to newsletter."}`,
        );
      } catch (error) {
        setIsLoading(false);
        toast(
          `Subscription error: ${error instanceof Error ? error.message : "An error occurred"}`,
        );
      }
    }
  };

  const onError: SubmitErrorHandler<SubscriptionSchema> = (error) => {
    toast(`Subscription error: ${error.email?.message || "Invalid email"}`);
  };

  return (
    <Form {...form}>
      <form id={formID} onSubmit={form.handleSubmit(onSubmit, onError)}>
        <div className="sm:grid sm:grid-cols-2 sm:gap-14">
          <div className="sm:flex sm:items-end">
            {formProps?.fields?.map((field) => {
              const Control = fields?.[field.blockType];
              if (Control && "name" in field) {
                return (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel htmlFor={field.name}>Email</FormLabel>
                        <FormControl>
                          <Control
                            id={field.name}
                            placeholder="Enter your email"
                            variant="filled"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                );
              }
              return null;
            })}
            <Button
              type="submit"
              disabled={isLoading || hasSubmitted}
              className="w-full sm:w-auto"
            >
              {isLoading && <IconLoader2 className="animate-spin" />}
              {submitButtonLabel}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
