import { cache } from "react";
import { draftMode } from "next/headers";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { PostQueryArgs } from "@/types/args";

export class PostService {
  private static async getPayloadClient() {
    return await getPayload({ config: configPromise });
  }

  static getBySlug = cache(async ({ slug }: PostQueryArgs) => {
    const { isEnabled: draft } = await draftMode();
    const payload = await this.getPayloadClient();

    const result = await payload.find({
      collection: "posts",
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      where: {
        slug: { equals: slug },
      },
    });

    return result.docs?.[0] || null;
  });
}
