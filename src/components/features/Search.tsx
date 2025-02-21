import { SearchBlock } from "@/types/payload";
import { PostSearch } from "@/components/features/Post/PostSearch";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { notFound } from "next/navigation";
import { PostList } from "@/components/features/Post/PostList";
import { Pagination } from "@/components/ui/Pagination";

export interface SearchBlockProps extends SearchBlock {
  category: string;
  page: unknown;
  locale: "all" | "en" | "pt";
}

export const Search: React.FC<SearchBlockProps> = async ({
  category,
  page,
  locale,
}: SearchBlockProps) => {
  const sanitizedPageNumber = Number(page);

  if (!Number.isInteger(sanitizedPageNumber)) notFound();

  const payload = await getPayload({ config: configPromise });

  const categories = await payload.find({
    collection: "categories",
    depth: 1,
    limit: 20,
    overrideAccess: false,
    select: {
      breadcrumbs: true,
      relatedPosts: true,
    },
    pagination: false,
  });

  const filteredCategories = categories.docs.filter(
    (category) => category.relatedPosts?.docs?.length,
  );

  const posts = await payload.find({
    collection: "posts",
    depth: 1,
    limit: 25,
    select: {
      title: true,
      slug: true,
      categories: true,
      publishedAt: true,
      timeToRead: true,
    },
    page: sanitizedPageNumber,
    ...(category !== "all" && {
      where: {
        and: [
          {
            "categories.breadcrumbs.url": {
              equals: `/${category}`,
            },
          },
        ],
      },
    }),
  });

  return (
    <>
      <PostSearch categories={filteredCategories} />
      <PostList posts={posts.docs} locale={locale} />
      <Pagination totalPages={posts.totalPages} />
    </>
  );
};
