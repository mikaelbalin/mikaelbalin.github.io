"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "#components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "#components/ui/Form";
import { Textarea } from "#components/ui/Textarea";

const commentSchema = z.object({
  text: z
    .string()
    .min(1, "Comment is required")
    .max(300, "Comment must be at most 300 characters"),
});

type CommentSchema = z.infer<typeof commentSchema>;

type CommentFormProps = {
  /** Returns `true` when the comment was submitted successfully. */
  onSubmitAction: (text: string) => boolean | Promise<boolean>;
  isSubmitting?: boolean;
  initialText?: string;
};

export function CommentForm({
  onSubmitAction,
  isSubmitting = false,
  initialText = "",
}: CommentFormProps) {
  const form = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: { text: "" },
  });

  // Restore a pending draft (e.g. after the OAuth redirect) once available.
  useEffect(() => {
    if (initialText) {
      form.setValue("text", initialText);
    }
  }, [initialText, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => {
          const ok = await onSubmitAction(values.text);
          if (ok) {
            form.reset();
          }
        })}
        className="flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Add a comment..." rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="self-end">
          {isSubmitting && <IconLoader2 className="animate-spin" />}
          Send
        </Button>
      </form>
    </Form>
  );
}
