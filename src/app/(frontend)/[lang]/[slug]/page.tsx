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
  const path = `/${slug}`;

  const page = await queryPageBySlug({
    slug,
    lang,
  });

  if (!page) {
    return <PayloadRedirects path={path} />;
  }

  const { hero, layout } = page;

  return (
    <>
      <PayloadRedirects disableNotFound path={path} />
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

// export async function generateStaticParams() {
//   const payload = await getPayload({ config: configPromise });
//   const pages = await payload.find({
//     collection: "pages",
//     draft: false,
//     limit: 1000,
//     overrideAccess: false,
//     pagination: false,
//     select: {
//       slug: true,
//     },
//   });

//   const params = pages.docs
//     ?.filter((doc) => {
//       return doc.slug !== "home";
//     })
//     .map(({ slug }) => {
//       return { slug };
//     });

//   return params;
// }
