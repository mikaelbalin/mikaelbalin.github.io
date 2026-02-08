import type { Metadata } from "next";
import { Hero } from "#components/Hero";
import { RenderBlocks } from "#components/RenderBlocks";
import { PayloadRedirects } from "#components/ui/PayloadRedirects";
import { i18n } from "#i18n-config";
import { generateMeta } from "#lib/generateMeta";
import { getAllSlugs, getBySlug } from "#lib/services/PageService";
import type { PageQueryArgs } from "#types/args";

// Force static generation for all pages at build time
export const dynamic = "force-static";
// Revalidate static pages every 24 hours (86400 seconds)
export const revalidate = 86400;

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

  const pageData = await getBySlug({
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

  const page = await getBySlug({
    slug,
    lang,
  });

  return generateMeta({ doc: page, lang });
}

export async function generateStaticParams(): Promise<PageQueryArgs[]> {
  const params = await getAllSlugs();
  return params;
}
