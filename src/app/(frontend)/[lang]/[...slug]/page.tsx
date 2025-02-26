import type { Metadata } from "next";
import { PayloadRedirects } from "@/components/ui/PayloadRedirects";
import React from "react";
import { RenderBlocks } from "@/components/features/RenderBlocks";
import { Hero } from "@/components/features/Hero";
import { generateMeta } from "@/utilities/generateMeta";
import { i18n } from "@/i18n-config";
import { PageQueryArgs } from "@/types/args";
import { PageService } from "@/lib/services/PageService";

type Args = Readonly<{
  params: Promise<PageQueryArgs>;
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

  const pageData = await PageService.getBySlug({
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

  const page = await PageService.getBySlug({
    slug,
    lang,
  });

  return generateMeta({ doc: page, lang });
}

export async function generateStaticParams(): Promise<PageQueryArgs[]> {
  const params = await PageService.getAllSlugs();
  return params;
}
