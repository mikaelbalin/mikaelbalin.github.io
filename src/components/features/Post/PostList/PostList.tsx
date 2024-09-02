import { Button, Container, Stack, Title } from "@mantine/core";
import { PostItem } from "@/components/features/Post/PostItem";
import { PropsWithChildren } from "react";
import { ArticleListResponseDataItem } from "@/types/data";

interface PostListProps extends PropsWithChildren {
  loadMore?: boolean;
  data: ArticleListResponseDataItem[];
}

export const PostList = ({ children, data, loadMore }: PostListProps) => {
  return (
    <Container component="section" className="pt-17">
      {children}
      <Stack gap={0} className="pt-14 border-b sm:pt-20">
        {data.map((item) => (
          <PostItem key={item.id} {...item.attributes} />
        ))}
      </Stack>
      {loadMore && (
        <div className="flex justify-center pt-14 sm:pt-20">
          <Button variant="outline">Load more post</Button>
        </div>
      )}
    </Container>
  );
};
