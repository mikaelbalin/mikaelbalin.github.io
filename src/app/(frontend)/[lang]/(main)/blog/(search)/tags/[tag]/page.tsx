import React from "react";
import { PostList } from "@/components/features/Post/PostList";
import { getArticles, getTags } from "@/data/loaders";
import { i18n } from "../../../../../../../../i18n-config";
import { Metadata } from "next";

type Props = {
  params: Promise<{ tag: string; lang: "en" | "pt" }>;
};

export async function generateStaticParams() {
  const tags = await getTags();
  return tags.flatMap(({ slug }) =>
    i18n.locales.map((lang) => ({ tag: slug, lang })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = (await params).tag;

  return {
    title: `Posts tagged with ${tag}`,
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  const { tag } = params;
  const { data: articles, meta } = await getArticles(
    0,
    Number(process.env.NEXT_PUBLIC_PAGE_LIMIT),
    tag === "all" ? undefined : tag,
  );

  return <PostList initialData={articles} initialMeta={meta} />;
}
