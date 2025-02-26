import { ArticleContent } from "@/components/features/Article/ArticleContent";
import { Metadata } from "next";
import { generateMeta } from "@/utilities/generateMeta";
import { i18n } from "@/i18n-config";
import { Content } from "@/components/ui/RichText/types";
import { PostQueryArgs } from "@/types/args";
import { PostService } from "@/lib/services/PostService";

type Args = {
  params: Promise<PostQueryArgs>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const params = await paramsPromise;
  const { slug = "" } = params;

  const post = await await PostService.getBySlug({ slug });

  return <ArticleContent content={post.content as Content} />;
}

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { slug = "" } = await paramsPromise;

  const post = await await PostService.getBySlug({ slug });

  return generateMeta({ doc: post, lang: i18n.defaultLocale });
}

export async function generateStaticParams() {
  const params = await await PostService.getAllSlugs();
  return params;
}
