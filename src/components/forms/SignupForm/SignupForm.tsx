"use client";

import { registerUserAction } from "@/data/actions/auth-actions";
import { signupSchema, SignupSchema } from "@/lib/schemas";
import { Button, Paper, PasswordInput, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";

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

    if (result.errors) {
      form.setErrors(result.zodErrors);
    }
  };

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
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
