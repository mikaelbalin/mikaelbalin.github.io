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
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { hasSlug } from "@/utilities/hasSlug";

type Args = Readonly<{
  params: Promise<Partial<QueryPageBySlugArgs>>;
  searchParams: Promise<{
    category: string;
    page: unknown;
  }>;
}>;

export default async function Page({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: Args) {
  const { slug: slugs = ["home"], lang = i18n.defaultLocale } =
    await paramsPromise;
  const { page = 1, category = "all" } = await searchParamsPromise;
  const slug = slugs[0];
  const path = `/${slug}`;

  const pageData = await queryPageBySlug({
    slug: slugs,
    lang,
  });

  if (!pageData) {
    return <PayloadRedirects path={path} />;
  }

  const { hero, layout } = pageData;

  return (
    <>
      <PayloadRedirects disableNotFound path={path} />
      <Hero {...hero} />
      {layout && (
        <RenderBlocks
          blocks={layout}
          locale={lang}
          page={page}
          category={category}
        />
      )}
    </>
  );
}

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { slug = ["home"], lang = i18n.defaultLocale } = await paramsPromise;
  const page = await queryPageBySlug({
    slug,
    lang,
  });

  return generateMeta({ doc: page, lang });
}

export async function generateStaticParams(): Promise<
  {
    lang: "pt" | "en";
    slug?: string[];
  }[]
> {
  const payload = await getPayload({ config: configPromise });
  const pages = await payload.find({
    collection: "pages",
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params: {
    lang: "en" | "pt";
    slug?: string[];
  }[] = pages.docs.filter(hasSlug).flatMap(({ slug }) => {
    return i18n.locales.map((lang) => ({
      lang,
      slug: slug === "home" ? undefined : [slug],
    }));
  });

  return params;
}
