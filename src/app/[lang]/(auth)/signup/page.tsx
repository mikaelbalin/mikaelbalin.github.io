import { SignupForm } from "@/components/forms/SignupForm";
import { cn } from "@/lib/utils";
import { Text, Container, Title } from "@mantine/core";
import Link from "next/link";

export default function SingUpRoute() {
  return (
    <Container
      size="sm"
      className={cn(
        "mt-16 sm:mt-19.5 min-h-screen",
        "flex flex-col justify-center",
      )}
    >
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
