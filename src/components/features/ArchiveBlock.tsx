import type { Post, ArchiveBlock as ArchiveBlockProps } from "@/payload-types";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";
import { PostList } from "@/components/features/Post/PostList";
import { PostLatest } from "@/components/features/Post/PostLatest";

export const ArchiveBlock: React.FC<ArchiveBlockProps> = async (props) => {
  const {
    categories,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    title,
    latestPostsLink,
  } = props;

  const limit = limitFromProps || 3;

  let posts: Post[] = [];

  if (populateBy === "collection") {
    const payload = await getPayload({ config: configPromise });

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === "object") return category.id;
      else return category;
    });

    const fetchedPosts = await payload.find({
      collection: "posts",
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    });

    posts = fetchedPosts.docs;
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === "object") return post.value;
      }) as Post[];

      posts = filteredSelectedPosts;
    }
  }

  return (
    <PostList posts={posts}>
      <PostLatest title={title} latestPostsLink={latestPostsLink} />
    </PostList>
  );
};
