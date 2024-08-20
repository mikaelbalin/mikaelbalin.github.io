import { SignupForm } from "@/components/forms/SignupForm";
import { Text, Container, Title } from "@mantine/core";
import Link from "next/link";

export default function SingUpRoute() {
  return (
    <Container size="sm" className="box-content mt-15">
      <Title size="h3" ta="center">
        Sign up
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Enter your details to creacte a new account
      </Text>
      <SignupForm />
      <Text ta="center" mt="md">
        Have an account? <Link href="/signin">Sign in</Link>
      </Text>
    </Container>
  );
}
