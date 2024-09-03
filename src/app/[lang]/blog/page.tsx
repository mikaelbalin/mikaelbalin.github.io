import React from "react";
import { Subscription } from "@/components/features/Subscription";
import { PostList } from "@/components/features/Post/PostList";
import { HeroBlog } from "@/components/features/Hero/HeroBlog";
import { getArticles, getTags } from "@/data/loaders";

export default async function Page() {
  const tags = await getTags();
  const { data: articles, meta } = await getArticles();

  return (
    <>
      <HeroBlog />
      <PostList tags={tags} initialData={articles} initialMeta={meta} />
      <Subscription />
    </>
  );
}
