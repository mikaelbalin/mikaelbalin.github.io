import { Title, Text, Container } from "@mantine/core";
import { SigninForm } from "@/components/forms/SigninForm";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SignInRoute() {
  return (
    <Container
      size="sm"
      className={cn(
        "mt-16 sm:mt-19.5 min-h-screen",
        "flex flex-col justify-center",
      )}
    >
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
