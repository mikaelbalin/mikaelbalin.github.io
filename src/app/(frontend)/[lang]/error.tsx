"use client";

import { IconBugFilled } from "@tabler/icons-react";
import { Title, Text } from "@mantine/core";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="space-y-4 max-w-80 px-4">
        <IconBugFilled className="h-36 w-36" />
        <Title size="h3">Oops! Something went wrong.</Title>
        <Text>This is an error page. Please try again later.</Text>
        <Text fs="italic" size="sm">
          {error.message}
        </Text>
      </div>
    </div>
  );
}
