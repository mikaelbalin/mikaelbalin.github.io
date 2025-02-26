import { getPayload } from "payload";
import configPromise from "@payload-config";
import { cache } from "react";
import { draftMode } from "next/headers";
import { PostQueryArgs } from "@/types/args";

export const getPostBySlug = cache(async ({ slug }: PostQueryArgs) => {
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
  });

  return result.docs?.[0] || null;
});
