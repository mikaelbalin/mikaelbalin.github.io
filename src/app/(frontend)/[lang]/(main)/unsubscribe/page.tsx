import { Title, Text, Container, Paper, Button } from "@mantine/core";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import configPromise from "@payload-config";

type PageProps = {
  params: Promise<{ lang: "en" | "pt" }>;
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
    <Container size="sm" className="my-16 sm:my-19.5">
      <Paper withBorder className="p-8 shadow-lg flex flex-col gap-6">
        <Title size="h3">{subscriber.email} successfully unsubscribed</Title>
        <Text>You have been unsubscribed from future emails.</Text>
        <Button>Subscribe back</Button>
      </Paper>
    </Container>
  );
}
