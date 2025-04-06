import React from "react";
import type { ArchiveBlock } from "#types/payload";
import { PostList } from "#components/Post/PostList";
import { PostLatest } from "#components/Post/PostLatest";
import { PostService } from "#lib/services/PostService";

export interface ArchiveBlockProps extends ArchiveBlock {
  locale: "en" | "pt" | "all";
}

export const Archive: React.FC<ArchiveBlockProps> = async (props) => {
  const { title, latestPostsLink, ...rest } = props;
  const posts = await PostService.queryArchivePosts(rest);

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
