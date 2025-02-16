import { getPayload } from "payload";
import configPromise from "@payload-config";
import { cache } from "react";
import { draftMode } from "next/headers";

export const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "posts",
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
    select: {
      content: true,
    },
  });

  return result.docs?.[0] || null;
});
