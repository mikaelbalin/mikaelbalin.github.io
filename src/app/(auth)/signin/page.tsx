import { Anchor, Title, Text, Container } from "@mantine/core";
import { SigninForm } from "@/components/forms/SigninForm";
import Link from "next/link";

export default function SignInRoute() {
  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet? <Link href="/signup">Create account</Link>
      </Text>

      <SigninForm />
    </Container>
  );
}
