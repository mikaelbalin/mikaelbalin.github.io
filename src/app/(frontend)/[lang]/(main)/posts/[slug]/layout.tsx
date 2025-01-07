import { cache } from "react";
import { ArticleHeader } from "@/components/features/Article/ArticleHeader";
import { ArticleFooter } from "@/components/features/Article/ArticleFooter";
import { draftMode } from "next/headers";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { PostList } from "@/components/features/Post/PostList";
import { Title } from "@mantine/core";
import { PayloadRedirects } from "@/components/PayloadRedirects";
import { formatDateTime } from "@/utilities/formatDateTime";
import { getClientSideURL } from "@/utilities/getURL";

function filter<T>(categories: (number | T)[]): T[] {
  return categories.filter(
    (category): category is T => typeof category !== "number",
  );
}

type Args = {
  params: Promise<{
    slug?: string;
    lang?: string;
  }>;
};

type LayoutProps = Readonly<
  {
    children: React.ReactNode;
  } & Args
>;

export default async function Layout(props: LayoutProps) {
  const { children } = props;
  const params = await props.params;
  const { slug = "" } = params;
  const data = await queryPostLayoutData({
    slug,
  });

  const url = "/posts/" + slug;
  if (!data) return <PayloadRedirects url={url} />;

  const { categories, title, relatedPosts, publishedAt } = data;
  const currentUrl = `${getClientSideURL()}/posts/${slug}`;

  return (
    <>
      <article>
        <ArticleHeader
          title={title}
          categories={Array.isArray(categories) ? filter(categories) : []}
          date={formatDateTime(publishedAt)}
        />
        {children}
        <ArticleFooter url={currentUrl} />
      </article>

      {Array.isArray(relatedPosts) && relatedPosts.length > 0 && (
        <PostList
          posts={filter(relatedPosts)}
          className="hidden sm:block py-24"
        >
          <Title order={2}>Similar articles</Title>
        </PostList>
      )}
    </>
  );
}

const queryPostLayoutData = cache(async ({ slug }: { slug: string }) => {
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
      title: true,
      categories: true,
      relatedPosts: true,
      publishedAt: true,
    },
  });

  return result.docs?.[0];
});
