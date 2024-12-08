import { Title, Text, Container, Paper, Button } from "@mantine/core";

export default function SignInRoute() {
  return (
    <Container size="sm" className="my-16 sm:my-19.5">
      <Paper withBorder className="p-8 shadow-lg flex flex-col gap-6">
        <Title size="h3">Successfully unsubscribed</Title>
        <Text>You have been unsubscribed from future emails.</Text>
        <Button>Subscribe back</Button>
      </Paper>
    </Container>
  );
}
