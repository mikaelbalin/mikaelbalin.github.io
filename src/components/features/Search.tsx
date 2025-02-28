import { SearchBlock } from "@/types/payload";
import { PostSearch } from "@/components/features/Post/PostSearch";
import { getPayload, Where } from "payload";
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
  title,
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

  const queryFilter: Where[] = [
    {
      _status: {
        equals: "published",
      },
    },
  ];

  if (category !== "all") {
    queryFilter.push({
      "categories.breadcrumbs.url": {
        equals: `/${category}`,
      },
    });
  }

  const posts = await payload.find({
    collection: "posts",
    depth: 1,
    limit: 25,
    draft: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      publishedAt: true,
      timeToRead: true,
    },
    page: sanitizedPageNumber,
    where: {
      and: queryFilter,
    },
    sort: "-publishedAt",
  });

  return (
    <>
      <PostSearch categories={filteredCategories} title={title} />
      <PostList posts={posts.docs} locale={locale} />
      <Pagination
        totalPages={posts.totalPages}
        className="flex justify-center mt-14 sm:mt-26"
      />
    </>
  );
};
