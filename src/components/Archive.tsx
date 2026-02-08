import type React from "react";
import { PostLatest } from "#components/Post/PostLatest";
import { PostList } from "#components/Post/PostList";
import { queryArchivePosts } from "#lib/services/PostService";
import type { ArchiveBlock } from "#types/payload";

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
