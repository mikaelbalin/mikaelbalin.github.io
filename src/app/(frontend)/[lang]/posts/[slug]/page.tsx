import type { Metadata } from "next";
import { ArticleContent } from "#components/Article/ArticleContent";
import type { Content } from "#components/ui/RichText/types";
import { i18n } from "#i18n-config";
import { generateMeta } from "#lib/generateMeta";
import { getAllSlugs, getBySlug } from "#lib/services/PostService";
import type { PostQueryArgs } from "#types/args";

type Args = {
  params: Promise<PostQueryArgs>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const params = await paramsPromise;
  const { slug = "" } = params;

  const post = await getBySlug({ slug });

  return post ? <ArticleContent content={post.content as Content} /> : null;
}

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { slug = "" } = await paramsPromise;

  const post = await getBySlug({ slug });

  return generateMeta({ doc: post, lang: i18n.defaultLocale });
}

export async function generateStaticParams() {
  const params = await getAllSlugs();
  return params;
}
