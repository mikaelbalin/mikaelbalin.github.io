import { Container } from "#components/Container";
import { Button } from "#components/ui/Button";
import { Text } from "#components/ui/Text";
import { Title } from "#components/ui/Title";
import Link from "next/link";

export const Unsubscribe = () => {
  return (
    <Container className="flex min-h-screen flex-col items-center justify-center">
      <div className="border-foreground flex flex-col gap-6 border p-8 shadow-lg">
        <Title size={3}>Successfully unsubscribed</Title>
        <Text>You have been unsubscribed from future emails.</Text>
        <Button asChild>
          <Link href={"/#subscription"}>Subscribe back</Link>
        </Button>
      </div>
    </Container>
  );
};
