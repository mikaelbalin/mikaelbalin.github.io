import { cache } from "react";
import { draftMode } from "next/headers";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { PageQueryParams } from "@/types/args";

export class PageService {
  private static async getPayloadClient() {
    return await getPayload({ config: configPromise });
  }

  static getBySlug = cache(async ({ slug, lang }: PageQueryParams) => {
    const { isEnabled: draft } = await draftMode();
    const payload = await this.getPayloadClient();

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
}
