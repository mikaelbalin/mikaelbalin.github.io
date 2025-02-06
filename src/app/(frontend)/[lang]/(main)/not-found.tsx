import Link from "next/link";
import { IconBug } from "@tabler/icons-react";
import { Button, Title, Text } from "@mantine/core";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="space-y-4">
        <IconBug className="h-36 w-36" />
        <Title size="h3">Oops!</Title>
        <Text>This page has left the building.</Text>
        <Button href="/" component={Link}>
          Go back home
        </Button>
      </div>
    </div>
  );
}
