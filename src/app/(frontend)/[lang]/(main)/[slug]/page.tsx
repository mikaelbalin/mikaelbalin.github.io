import type { Metadata } from "next";
import { PayloadRedirects } from "@/components/ui/PayloadRedirects";
import React from "react";
import { RenderBlocks } from "@/components/features/RenderBlocks";
import { Hero } from "@/components/features/Hero";
import { generateMeta } from "@/utilities/generateMeta";
import {
  queryPageBySlug,
  type QueryPageBySlugArgs,
} from "@/utilities/queryPageBySlug";
import { i18n } from "@/i18n-config";

type Args = {
  params: Promise<Partial<QueryPageBySlugArgs>>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = "home", lang = i18n.defaultLocale } = await paramsPromise;
  const url = "/" + slug;

  const page = await queryPageBySlug({
    slug,
    lang,
  });

  if (!page) {
    return <PayloadRedirects url={url} />;
  }

  const { hero, layout } = page;

  return (
    <>
      <PayloadRedirects disableNotFound url={url} />
      <Hero {...hero} />
      {layout && <RenderBlocks blocks={layout} />}
    </>
  );
}

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { slug = "home", lang = i18n.defaultLocale } = await paramsPromise;
  const page = await queryPageBySlug({
    slug,
    lang,
  });

  return generateMeta({ doc: page });
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "pages",
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
});
