import { cache } from "react";
import { draftMode } from "next/headers";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { PostQueryArgs } from "@/types/args";
import { Category } from "@/types/payload";

function isCategory(value: unknown): value is Category {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "title" in value
  );
}

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

  static getPostLayoutData = cache(async ({ slug }: { slug: string }) => {
    const payload = await this.getPayloadClient();

    const { isEnabled: draft } = await draftMode();

    const result = await payload.find({
      collection: "posts",
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      where: {
        slug: {
          equals: slug,
        },
      },
      select: {
        title: true,
        categories: true,
        relatedPosts: true,
        publishedAt: true,
        timeToRead: true,
      },
    });

    const firstCategory = result.docs[0]?.categories?.[0];

    const similarPosts = isCategory(firstCategory)
      ? await payload.find({
          collection: "posts",
          limit: 3,
          pagination: false,
          where: {
            and: [
              {
                "categories.title": {
                  equals: firstCategory.title,
                },
              },
              {
                slug: {
                  not_equals: slug,
                },
              },
            ],
          },
        })
      : null;

    const doc = result.docs?.[0];

    return {
      ...doc,
      relatedPosts:
        Array.isArray(doc.relatedPosts) && doc.relatedPosts.length === 0
          ? similarPosts?.docs
          : doc.relatedPosts,
    };
  });
}
