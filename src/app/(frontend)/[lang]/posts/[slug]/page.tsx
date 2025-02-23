import { ArticleContent } from "@/components/features/Article/ArticleContent";
import { Metadata } from "next";
import { generateMeta } from "@/utilities/generateMeta";
import { queryPostBySlug } from "@/utilities/queryPostBySlug";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { hasSlug } from "@/utilities/hasSlug";
import { i18n } from "@/i18n-config";
import { Content } from "@/components/ui/RichText/types";

type Args = {
  params: Promise<{
    slug?: string;
    lang?: string;
  }>;
};

export default async function Page(props: Args) {
  const params = await props.params;
  const { slug = "" } = params;

  const post = await queryPostBySlug({ slug });

  return <ArticleContent content={post.content as Content} />;
}

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { slug = "" } = await paramsPromise;

  const post = await queryPostBySlug({ slug });

  return generateMeta({ doc: post });
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });

  const posts = await payload.find({
    collection: "posts",
    draft: false,
    limit: 100,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params: {
    lang: "en" | "pt";
    slug: string;
  }[] = posts.docs.filter(hasSlug).flatMap(({ slug }) => {
    return i18n.locales.map((lang) => ({
      lang,
      slug,
    }));
  });

  return params;
}
