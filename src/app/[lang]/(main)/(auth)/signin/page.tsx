import { Title, Text } from "@mantine/core";
import { SigninForm } from "@/components/forms/SigninForm";
import Link from "next/link";

export default function SignInRoute() {
  return (
    <>
      <Title size="h3">Welcome back!</Title>
      <Text c="dimmed" size="sm">
        Enter your details to sign in to your account
      </Text>
      <SigninForm />
      <Text>
        Do not have an account yet? <Link href="/signup">Create account</Link>
      </Text>
    </>
  );
}
