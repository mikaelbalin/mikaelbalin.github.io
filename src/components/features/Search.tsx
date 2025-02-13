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
}

export const Search: React.FC<SearchBlockProps> = async ({
  category,
  page,
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
    },
    pagination: false,
    where: {
      // Find only categories that are referenced in posts
      id: {
        exists: true,
        in: {
          relationTo: "posts",
          value: {
            key: "categories.id",
          },
        },
      },
    },
  });

  const posts = await payload.find({
    collection: "posts",
    depth: 1,
    limit: 2,
    overrideAccess: false,
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

  // console.log({ categories });

  return (
    <>
      <PostSearch categories={categories.docs} />
      <PostList posts={posts.docs} />
      <Pagination totalPages={posts.totalPages} />
    </>
  );
};
