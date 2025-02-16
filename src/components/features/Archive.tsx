import type { ArchiveBlock } from "@/types/payload";

import React from "react";
import { PostList } from "@/components/features/Post/PostList";
import { PostLatest } from "@/components/features/Post/PostLatest";
import { queryArchivePosts } from "@/utilities/queryArchivePosts";

export interface ArchiveBlockProps extends ArchiveBlock {
  locale: "en" | "pt" | "all";
}

export const Archive: React.FC<ArchiveBlockProps> = async (props) => {
  const { title, latestPostsLink, ...rest } = props;
  const posts = await queryArchivePosts(rest);

  return (
    <PostList posts={posts} locale={rest.locale}>
      <PostLatest
        title={title}
        latestPostsLink={latestPostsLink}
        locale={rest.locale}
      />
    </PostList>
  );
};
