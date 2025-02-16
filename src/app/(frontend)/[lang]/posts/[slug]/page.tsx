import { ArticleContent } from "@/components/features/Article/ArticleContent";
import { Metadata } from "next";
import { generateMeta } from "@/utilities/generateMeta";
import { queryPostBySlug } from "@/utilities/queryPostBySlug";

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

  return <ArticleContent content={post.content} />;
}

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { slug = "" } = await paramsPromise;

  const post = await queryPostBySlug({ slug });

  return generateMeta({ doc: post });
}

// export async function generateStaticParams() {
//   const payload = await getPayload({ config: configPromise });

//   const posts = await payload.find({
//     collection: "posts",
//     draft: false,
//     limit: 1000,
//     overrideAccess: false,
//     pagination: false,
//     select: {
//       slug: true,
//     },
//   });

//   const params = posts.docs.map(({ slug }) => {
//     return { slug };
//   });

//   return params;
// }
