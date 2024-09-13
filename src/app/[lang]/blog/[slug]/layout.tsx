import React from "react";
import { ArticleHeader } from "@/components/features/Article/ArticleHeader";
import { getArticleBySlug } from "@/data/loaders";
import { ArticleFooter } from "@/components/features/Article/ArticleFooter";

export default async function Page({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { slug: string };
}>) {
  const { slug } = params;
  const data = await getArticleBySlug(slug);

  if (!data?.length) return <h2>no post found</h2>;

  const post = data[0];

  const tags = post.attributes.tags.data;
  const title = post.attributes.title;

  return (
    <article>
      <ArticleHeader tags={tags} title={title} />
      {children}
      <ArticleFooter />
    </article>
  );
}
