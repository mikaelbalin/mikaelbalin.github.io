import { cache } from "react";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { draftMode } from "next/headers";

export type QueryPageBySlugArgs = {
  slug: string;
  lang: "en" | "pt" | "all";
};

export const queryPageBySlug = cache(
  async ({ slug, lang }: QueryPageBySlugArgs) => {
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
          equals: slug,
        },
      },
    });

    return result.docs?.[0] || null;
  },
);
