import React from "react";
import { ArticleHeader } from "@/components/features/Article/ArticleHeader";
import { getArticleBySlug, getArticlesByTag } from "@/data/loaders";
import { ArticleFooter } from "@/components/features/Article/ArticleFooter";
import { PostList } from "@/components/features/Post/PostList";
import { Title } from "@mantine/core";

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

  const articles = await getArticlesByTag(
    tags.map((tag: any) => tag.attributes.name),
  );

  return (
    <>
      <article>
        <ArticleHeader tags={tags} title={title} />
        {children}
        <ArticleFooter />
      </article>

      <PostList initialData={articles} className="hidden sm:block py-24">
        <Title order={2}>Similar articles</Title>
      </PostList>
    </>
  );
}
