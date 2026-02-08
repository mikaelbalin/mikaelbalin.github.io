import configPromise from "@payload-config";
import { draftMode } from "next/headers";
import { getPayload } from "payload";
import { cache } from "react";
import { i18n } from "#i18n-config";
import { hasSlug } from "#lib/hasSlug";
import type { PageQueryArgs, PageQueryParams } from "#types/args";
import type { FooterSelect, HeaderSelect } from "#types/payload";

async function getPayloadClient() {
  return await getPayload({ config: configPromise });
}

export const getBySlug = cache(async ({ slug, lang }: PageQueryParams) => {
  const payload = await getPayloadClient();
  const { isEnabled: draft } = await draftMode();

  const result = await payload.find({
    collection: "pages",
    locale: lang,
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: { equals: slug[0] },
    },
  });

  return result.docs?.[0] || null;
});

export async function getAllSlugs(): Promise<PageQueryArgs[]> {
  const payload = await getPayloadClient();

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

  const slugs = pages.docs.filter(hasSlug).flatMap(({ slug }) => {
    return i18n.locales.map((lang) => ({
      lang,
      slug: [slug],
    }));
  });

  return slugs;
}

export const getHeader = cache(async (lang: "en" | "pt") => {
  const payload = await getPayloadClient();

  const global = await payload.findGlobal<"header", HeaderSelect>({
    slug: "header",
    depth: 0,
    locale: lang,
  });

  return global;
});

export const getFooter = cache(async (lang: "en" | "pt") => {
  const payload = await getPayloadClient();

  const global = await payload.findGlobal<"footer", FooterSelect>({
    slug: "footer",
    depth: 1,
    locale: lang,
  });

  return global;
});
