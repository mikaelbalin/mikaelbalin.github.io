import { cache } from "react";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { draftMode } from "next/headers";
import { PageQueryParams } from "@/types/args";

export const getPageBySlug = cache(async ({ slug, lang }: PageQueryParams) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "pages",
    locale: lang,
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug[0],
      },
    },
  });

  return result.docs?.[0] || null;
});
