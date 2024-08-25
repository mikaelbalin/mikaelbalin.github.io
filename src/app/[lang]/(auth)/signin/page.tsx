import { Anchor, Title, Text, Container } from "@mantine/core";
import { SigninForm } from "@/components/forms/SigninForm";
import Link from "next/link";

export default function SignInRoute() {
  return (
    <Container size="sm" className="mt-15">
      <Title size="h3" ta="center">
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Enter your details to sign in to your account
      </Text>
      <SigninForm />
      <Text ta="center" mt="md">
        Do not have an account yet? <Link href="/signup">Create account</Link>
      </Text>
    </Container>
  );
}
