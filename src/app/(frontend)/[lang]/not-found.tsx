import Link from "next/link";
import { IconBug } from "@tabler/icons-react";
import { Title } from "#components/ui/Title";
import { Text } from "#components/ui/Text";
import { Button } from "#components/ui/Button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="max-w-80 space-y-4 px-4">
        <IconBug className="h-36 w-36" />
        <Title size={3}>Oops!</Title>
        <Text>This page has left the building.</Text>
        <Button asChild>
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </div>
  );
}
