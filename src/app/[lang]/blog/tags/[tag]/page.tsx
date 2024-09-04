import React from "react";
import { Subscription } from "@/components/features/Subscription";
import { PostList } from "@/components/features/Post/PostList";
import { HeroBlog } from "@/components/features/Hero/HeroBlog";
import { getArticles, getTags } from "@/data/loaders";

export default async function Page({ params }: { params: { tag: string } }) {
  const { tag } = params;
  const { data: articles, meta } = await getArticles(
    0,
    Number(process.env.NEXT_PUBLIC_PAGE_LIMIT),
    tag,
  );

  return (
    <>
      <HeroBlog />
      <PostList initialData={articles} initialMeta={meta} />
      <Subscription />
    </>
  );
}
