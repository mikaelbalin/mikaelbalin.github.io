import { Title, Text, Container, Paper, Button } from "@mantine/core";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import Link from "next/link";
import type { LocaleParams } from "@/i18n-config";

type PageProps = {
  params: Promise<LocaleParams>;
  searchParams: Promise<{
    ut?: string;
  }>;
};

export default async function Page({
  searchParams: searchParamsPromise,
}: PageProps) {
  const { ut } = await searchParamsPromise;

  if (!ut) notFound();

  const payload = await getPayload({ config: configPromise });
  const result = await payload.find({
    collection: "subscribers",
    where: {
      token: {
        equals: ut,
      },
    },
  });

  if (result.docs.length === 0) notFound();

  const subscriber = result.docs[0];
  await payload.update({
    collection: "subscribers",
    id: subscriber.id,
    data: { subscribed: false },
  });

  return (
    <Container
      size="sm"
      className="flex flex-col items-center justify-center min-h-screen"
    >
      <div className="space-y-4">
        <Paper withBorder className="p-8 shadow-lg flex flex-col gap-6">
          <Title size="h3">Successfully unsubscribed</Title>
          <Text>You have been unsubscribed from future emails.</Text>
          <Button component={Link} href={"/#subscription"}>
            Subscribe back
          </Button>
        </Paper>
      </div>
    </Container>
  );
}
