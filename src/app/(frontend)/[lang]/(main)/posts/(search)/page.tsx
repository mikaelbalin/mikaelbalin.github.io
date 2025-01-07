import React from "react";
import { PostList } from "@/components/features/Post/PostList";
import { generateLanguageParams } from "../../../../../../i18n-config";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export const generateStaticParams = generateLanguageParams;

export default async function Page() {
  const payload = await getPayload({ config: configPromise });

  const posts = await payload.find({
    collection: "posts",
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      publishedAt: true,
    },
  });

  return <PostList posts={posts.docs} />;
}
