import { Container, Stack, BoxProps } from "@mantine/core";
import { PostItem } from "@/components/features/Post/PostItem";
import { PropsWithChildren } from "react";
import { Post } from "@/types/payload";

type PostSummary = Pick<
  Post,
  "id" | "slug" | "categories" | "title" | "publishedAt" | "timeToRead"
>;

interface PostListProps extends PropsWithChildren, Pick<BoxProps, "className"> {
  posts: PostSummary[];
  locale: "en" | "pt" | "all";
}

export const PostList = ({
  children,
  posts,
  className,
  locale,
}: PostListProps) => {
  return (
    <Container component="section" className={className}>
      {children}
      <Stack gap={0} className="pt-14 sm:pt-20">
        {posts.map((item) => (
          <PostItem
            key={item.id}
            {...item}
            relationTo="posts"
            locale={locale}
          />
        ))}
      </Stack>
    </Container>
  );
};
