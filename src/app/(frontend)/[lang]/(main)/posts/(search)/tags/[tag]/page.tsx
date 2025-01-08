import { PostList } from "@/components/features/Post/PostList";
import { Metadata } from "next";
import { getPayload } from "payload";
import configPromise from "@payload-config";

type Args = {
  params: Promise<{ tag: string; lang: "en" | "pt" }>;
};

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const tag = (await params).tag;

  return {
    title: `Posts tagged with ${tag}`,
  };
}

type PageProps = Args;

export default async function Page(props: PageProps) {
  const params = await props.params;
  const { tag = "all" } = params;

  const payload = await getPayload({ config: configPromise });
  const posts = await payload.find({
    collection: "posts",
    limit: 10,
    pagination: false,
    ...(tag !== "all" && {
      where: {
        and: [
          {
            "categories.breadcrumbs.url": {
              equals: `/${tag}`,
            },
          },
        ],
      },
    }),
  });

  return <PostList posts={posts.docs} />;
}
