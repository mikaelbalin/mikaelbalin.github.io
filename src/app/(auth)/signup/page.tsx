import { SignupForm } from "@/components/forms/SignupForm";
import { Text, Container, Title } from "@mantine/core";

export default function SingUpRoute() {
  return (
    <Container size={420} my={40}>
      <Title ta="center">Sign up</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Enter your details to creacte a new account
      </Text>
      <SignupForm />
    </Container>
  );
}
