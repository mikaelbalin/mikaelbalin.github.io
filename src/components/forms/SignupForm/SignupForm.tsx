"use client";

import { StrapiErrors, StrapiErrorsProps } from "@/components/ui/StrapiErrors";
import { registerUserAction } from "@/data/actions/auth-actions";
import { signupSchema, SignupSchema } from "@/lib/schemas";
import { Button, Paper, PasswordInput, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";

export function SignupForm() {
  const form = useForm<SignupSchema>({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate: zodResolver(signupSchema),
  });

  const handleError = (errors: typeof form.errors) => {
    const firstErrorPath = Object.keys(errors)[0];
    form.getInputNode(firstErrorPath)?.focus();
  };

  const handleSubmit = async (values: SignupSchema) => {
    const result = await registerUserAction(values);

    if (result?.errors) {
      form.setErrors(result.errors);
    }

    if (result?.strapiError) {
      notifications.show({
        title: result.strapiError.name,
        message: result.strapiError.message,
      });
    }
  };

  return (
    <Paper withBorder className="p-8 text-left shadow-lg">
      <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
        <TextInput
          withAsterisk
          label="User name"
          placeholder="username"
          key={form.key("username")}
          {...form.getInputProps("username")}
        />
        <TextInput
          withAsterisk
          label="Email"
          placeholder="you@email.com"
          key={form.key("email")}
          {...form.getInputProps("email")}
          mt="md"
        />
        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="Your password"
          key={form.key("password")}
          {...form.getInputProps("password")}
          mt="md"
        />
        <Button fullWidth mt="xl" type="submit">
          Sign up
        </Button>
      </form>
    </Paper>
  );
}
