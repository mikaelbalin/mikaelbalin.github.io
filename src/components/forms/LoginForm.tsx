"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { useState } from "react";
import {
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import {
  type BskyLoginSchema,
  bskyLoginSchema,
} from "#components/forms/schemas";
import { Button } from "#components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "#components/ui/Form";
import { Input } from "#components/ui/Input";

type LoginFormProps = {
  /** Relative path to return to after the OAuth flow (e.g. `/en/posts/slug`). */
  returnTo?: string;
};

export function LoginForm({ returnTo = "/" }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<BskyLoginSchema>({
    resolver: zodResolver(bskyLoginSchema),
    defaultValues: { handle: "" },
  });

  const onSubmit: SubmitHandler<BskyLoginSchema> = async (values) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/oauth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handle: values.handle, returnTo }),
      });

      const json = await response.json();

      if (!response.ok || !json.redirectUrl) {
        setIsLoading(false);

        toast("Login error", {
          description: json.error || "Failed to start login",
        });

        return;
      }

      // Redirect the user to the Bluesky authorization page.
      window.location.href = json.redirectUrl;
    } catch (error) {
      setIsLoading(false);

      toast("Login error", {
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  const onError: SubmitErrorHandler<BskyLoginSchema> = (errors) => {
    const firstErrorPath = Object.keys(errors)[0];
    form.setFocus(firstErrorPath as keyof BskyLoginSchema);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="handle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bluesky handle</FormLabel>
              <FormControl>
                <Input
                  placeholder="you.bsky.social"
                  autoComplete="username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading && <IconLoader2 className="animate-spin" />}
          Sign in with BlueSky
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a
            href="https://bsky.app"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:no-underline"
          >
            Create one on bsky.app
          </a>
        </p>
      </form>
    </Form>
  );
}
