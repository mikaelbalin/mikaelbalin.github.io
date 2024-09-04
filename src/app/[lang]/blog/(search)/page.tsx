import React from "react";
import { PostList } from "@/components/features/Post/PostList";
import { getArticles } from "@/data/loaders";

export default async function Page() {
  const { data: articles, meta } = await getArticles();

  return <PostList initialData={articles} initialMeta={meta} />;
}
