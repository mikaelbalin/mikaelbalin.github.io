import { cache } from "react";
import { ArticleHeader } from "@/components/features/Article/ArticleHeader";
import { ArticleFooter } from "@/components/features/Article/ArticleFooter";
import { draftMode } from "next/headers";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { PostList } from "@/components/features/Post/PostList";
import { Title } from "@mantine/core";
import { PayloadRedirects } from "@/components/ui/PayloadRedirects";
import { formatDateTime } from "@/utilities/formatDateTime";
import { getClientSideURL } from "@/utilities/getURL";
import { Category } from "@/types/payload";

function filter<T>(categories: (number | T)[]): T[] {
  return categories.filter(
    (category): category is T => typeof category !== "number",
  );
}

function isCategory(value: unknown): value is Category {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "title" in value
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

  const path = `/posts/${slug}`;
  if (!data) return <PayloadRedirects path={path} />;

  const { categories, title, relatedPosts, publishedAt, timeToRead } = data;
  const currentUrl = `${getClientSideURL()}/posts/${slug}`;

  return (
    <>
      <article>
        <ArticleHeader
          title={title}
          categories={Array.isArray(categories) ? filter(categories) : []}
          date={formatDateTime(publishedAt)}
          timeToRead={timeToRead}
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
      timeToRead: true,
    },
  });

  const firstCategory = result.docs[0]?.categories?.[0];

  const similarPosts = isCategory(firstCategory)
    ? await payload.find({
        collection: "posts",
        limit: 3,
        pagination: false,
        where: {
          and: [
            {
              "categories.title": {
                equals: firstCategory.title,
              },
            },
            {
              slug: {
                not_equals: slug,
              },
            },
          ],
        },
      })
    : null;

  const doc = result.docs?.[0];

  return {
    ...doc,
    relatedPosts:
      Array.isArray(doc.relatedPosts) && doc.relatedPosts.length === 0
        ? similarPosts?.docs
        : doc.relatedPosts,
  };
});
