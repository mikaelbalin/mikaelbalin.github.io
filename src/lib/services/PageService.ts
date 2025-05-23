import { cache } from "react";
import { draftMode } from "next/headers";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { PageQueryArgs, PageQueryParams } from "#types/args";
import { i18n } from "#i18n-config";
import { FooterSelect, HeaderSelect } from "#types/payload";
import { hasSlug } from "#lib/hasSlug";

export class PageService {
  private static async getPayloadClient() {
    return await getPayload({ config: configPromise });
  }

  static readonly getBySlug = cache(async ({ slug, lang }: PageQueryParams) => {
    const payload = await this.getPayloadClient();
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

  static async getAllSlugs(): Promise<PageQueryArgs[]> {
    const payload = await this.getPayloadClient();

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

  static readonly getHeader = cache(async (lang: "en" | "pt") => {
    const payload = await this.getPayloadClient();

    const global = await payload.findGlobal<"header", HeaderSelect>({
      slug: "header",
      depth: 0,
      locale: lang,
    });

    return global;
  });

  static readonly getFooter = cache(async (lang: "en" | "pt") => {
    const payload = await this.getPayloadClient();

    const global = await payload.findGlobal<"footer", FooterSelect>({
      slug: "footer",
      depth: 1,
      locale: lang,
    });

    return global;
  });
}
