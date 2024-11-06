import { SignupForm } from "@/components/forms/SignupForm";
import { Text, Title } from "@mantine/core";
import Link from "next/link";

export default function SingUpRoute() {
  return (
    <>
      <Title size="h3">Sign up</Title>
      <Text c="dimmed" size="sm">
        Enter your details to creacte a new account
      </Text>
      <SignupForm />
      <Text>
        Have an account? <Link href="/signin">Sign in</Link>
      </Text>
    </>
  );
}
