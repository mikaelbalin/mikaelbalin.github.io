"use client";

import { useState } from "react";
import { toast } from "sonner";
import { IconLoader2 } from "@tabler/icons-react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ContactFormSchema,
  contactFormSchema,
} from "#components/forms/schemas";
import { fields } from "#components/forms/fields";
import { FormBlock } from "#types/payload";
import { isValidForm } from "#lib/isValidForm";
import { buildInitialFormState } from "#lib/buildInitialFormState";
import { Button } from "#components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "#components/ui/Form";
import { RichText } from "#components/ui/RichText/RichText";
import { Content as RichTextContent } from "#components/ui/RichText/types";

type ContactFormProps = FormBlock;

export const ContactForm = (props: ContactFormProps) => {
  const { form: formProps } = props;

  if (!isValidForm(formProps)) {
    throw new Error("Invalid form configuration provided");
  }

  const { id, submitButtonLabel } = formProps;
  const formID = String(id);
  const defaultValues = buildInitialFormState(formProps.fields);

  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<ContactFormSchema> = async (values) => {
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

          toast(`Form submit error: ${json.status}`, {
            description: json.error || "Internal Server Error",
          });

          return;
        }

        setIsLoading(false);
        setHasSubmitted(true);

        toast("Thank you!", {
          description: "I'll get back to you as soon as possible",
        });
      } catch (error) {
        setIsLoading(false);

        toast("Form submit error", {
          description:
            error instanceof Error ? error.message : "An error occurred",
        });
      }
    }
  };

  const onError: SubmitErrorHandler<ContactFormSchema> = (errors) => {
    const firstErrorPath = Object.keys(errors)[0];
    form.setFocus(firstErrorPath as keyof ContactFormSchema);
  };

  return (
    <Form {...form}>
      <form id={formID} onSubmit={form.handleSubmit(onSubmit, onError)}>
        <div className="flex flex-col gap-6">
          {formProps?.fields?.map((field) => {
            if (field.blockType === "message") {
              return (
                <RichText
                  key={field.id}
                  content={field.message as RichTextContent}
                  className="-mb-6 sm:-mb-8"
                />
              );
            }

            const Control = fields?.[field.blockType];
            if (!Control || !("name" in field)) return null;

            return (
              <FormField
                key={field.id}
                control={form.control}
                name={field.name as keyof ContactFormSchema}
                render={({ field: fieldProps }) => {
                  const { name, disabled, value, onBlur, onChange, ref } =
                    fieldProps;
                  return field.blockType === "checkbox" ? (
                    <FormItem>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Control
                            id={name}
                            name={field.name}
                            disabled={disabled}
                            onBlur={onBlur}
                            onCheckedChange={onChange}
                            ref={ref}
                            checked={!!value}
                          />
                        </FormControl>
                        <FormLabel htmlFor={name} className="block">
                          {field.label}
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  ) : (
                    <FormItem>
                      <FormLabel htmlFor={name}>{field.label}</FormLabel>
                      <FormControl>
                        <Control
                          id={name}
                          placeholder={`Your ${field.label?.toLowerCase()}`}
                          name={field.name}
                          disabled={disabled}
                          onBlur={onBlur}
                          onChange={onChange}
                          ref={ref}
                          value={typeof value !== "boolean" ? value : ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            );
          })}
        </div>

        <div className="mt-8 justify-end">
          <Button
            form={formID}
            type="submit"
            disabled={isLoading || hasSubmitted}
          >
            {isLoading && <IconLoader2 className="animate-spin" />}
            {submitButtonLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};
