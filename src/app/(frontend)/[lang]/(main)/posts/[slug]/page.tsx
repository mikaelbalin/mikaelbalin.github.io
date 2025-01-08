import { cache } from "react";
import { draftMode } from "next/headers";
import { ArticleContent } from "@/components/features/Article/ArticleContent";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Metadata } from "next";
import { generateMeta } from "@/utilities/generateMeta";

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "posts",
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
    select: {
      content: true,
    },
  });

  return result.docs?.[0] || null;
});

type Args = {
  params: Promise<{
    slug?: string;
    lang?: string;
  }>;
};

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
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params = posts.docs.map(({ slug }) => {
    return { slug };
  });

  return params;
}

type PageProps = Readonly<
  {
    children: React.ReactNode;
  } & Args
>;

export default async function Page(props: PageProps) {
  const params = await props.params;
  const { slug = "" } = params;

  const post = await queryPostBySlug({ slug });

  return <ArticleContent content={post.content} />;
}
