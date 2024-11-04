import { Title, Text, Container } from "@mantine/core";
import { SigninForm } from "@/components/forms/SigninForm";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
