import React from "react";
import { PostList } from "@/components/features/Post/PostList";
import { getArticles } from "@/data/loaders";
import { generateLanguageParams } from "../../../../../../i18n-config";

export const generateStaticParams = generateLanguageParams;

export default async function Page() {
  const { data: articles, meta } = await getArticles();

  return <PostList initialData={articles} initialMeta={meta} />;
}
