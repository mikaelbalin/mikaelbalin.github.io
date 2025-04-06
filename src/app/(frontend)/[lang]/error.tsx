"use client";

import { IconBugFilled } from "@tabler/icons-react";
import { Title } from "#components/ui/Title";
import { Text } from "#components/ui/Text";

export default function ErrorPage({ error }: Readonly<{ error: Error }>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="max-w-80 space-y-4 px-4">
        <IconBugFilled className="h-36 w-36" />
        <Title size={3}>Oops! Something went wrong.</Title>
        <Text>This is an error page. Please try again later.</Text>
        <Text className="italic" size="sm">
          {error.message}
        </Text>
      </div>
    </div>
  );
}
