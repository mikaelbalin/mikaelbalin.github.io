import React from "react";
import { PostList } from "@/components/features/Post/PostList";
// import { generateLanguageParams } from "@/i18n-config";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Pagination } from "@/components/ui/Pagination/Pagination";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import type { LocaleParams } from "@/i18n-config";

// export const generateStaticParams = generateLanguageParams;

type Args = {
  params: Promise<LocaleParams>;
  searchParams: Promise<{
    category: string;
    page: number;
  }>;
};

export async function generateMetadata({
  searchParams: searchParamsPromise,
}: Args): Promise<Metadata> {
  const { page, category } = await searchParamsPromise;
  return {
    title: `Posts page${page ? ` ${page}` : ""} with${category ? ` ${category}` : ""} category`,
  };
}

type PageProps = Args;

export default async function Page({
  searchParams: searchParamsPromise,
}: PageProps) {
  const { page = 1, category = "all" } = await searchParamsPromise;
  const sanitizedPageNumber = Number(page);

  if (!Number.isInteger(sanitizedPageNumber)) notFound();

  const payload = await getPayload({ config: configPromise });

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

  return (
    <>
      <PostList posts={posts.docs} />
      <Pagination totalPages={posts.totalPages} />
    </>
  );
}
