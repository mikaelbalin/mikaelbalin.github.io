import { Unsubscribe } from "#components/Unsubscribe";
import type { LocaleParams } from "#i18n-config";
import configPromise from "@payload-config";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

type PageProps = {
  params: Promise<LocaleParams>;
  searchParams: Promise<{
    ut?: string;
  }>;
};

export default async function Page({
  searchParams: searchParamsPromise,
}: Readonly<PageProps>) {
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

  return <Unsubscribe />;
}
