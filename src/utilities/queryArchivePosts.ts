import { ArchiveBlock, Post } from "@/types/payload";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { cache } from "react";

export interface queryArchivePostsArgs
  extends Pick<
    ArchiveBlock,
    "categories" | "limit" | "populateBy" | "selectedDocs"
  > {
  locale: "en" | "pt" | "all";
}

export const queryArchivePosts = cache(async (args: queryArchivePostsArgs) => {
  const { categories, limit, populateBy, selectedDocs, locale } = args;
  // console.log({ categories });

  let posts: Post[] = [];

  if (populateBy === "collection") {
    const payload = await getPayload({ config: configPromise });

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === "object") return category.id;
      else return category;
    });

    const fetchedPosts = await payload.find({
      collection: "posts",
      depth: 1,
      limit: limit || 5,
      locale,
      ...(flattenedCategories?.length && {
        where: {
          categories: {
            in: flattenedCategories,
          },
        },
      }),
    });

    posts = fetchedPosts.docs;
  } else if (selectedDocs?.length) {
    posts = selectedDocs
      .map((post) => (typeof post.value === "object" ? post.value : null))
      .filter((post): post is Post => post !== null);
  }

  return posts;
});
