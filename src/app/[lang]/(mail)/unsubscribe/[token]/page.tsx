import { Title, Text, Container, Paper } from "@mantine/core";
import Link from "next/link";

export default function SignInRoute() {
  return (
    <Container size="sm" className="my-16 sm:my-19.5">
      <Paper withBorder className="p-8 shadow-lg flex flex-col gap-6">
        <Title size="h3">Welcome back!</Title>
        <Text c="dimmed" size="sm">
          Enter your details to sign in to your account
        </Text>
        <Text>
          Do not have an account yet? <Link href="/signup">Create account</Link>
        </Text>
      </Paper>
    </Container>
  );
}
