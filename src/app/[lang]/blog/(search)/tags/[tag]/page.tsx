import React from "react";
import { PostList } from "@/components/features/Post/PostList";
import { getArticles } from "@/data/loaders";

export default async function Page({ params }: { params: { tag: string } }) {
  const { tag } = params;
  const { data: articles, meta } = await getArticles(
    0,
    Number(process.env.NEXT_PUBLIC_PAGE_LIMIT),
    tag === "all" ? undefined : tag,
  );

  return <PostList initialData={articles} initialMeta={meta} />;
}
