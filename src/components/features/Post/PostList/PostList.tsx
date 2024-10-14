"use client";

import { Button, Container, Stack, BoxProps } from "@mantine/core";
import { PostItem } from "@/components/features/Post/PostItem";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { Post, Meta } from "@/types/data";
import { getArticles } from "@/data/loaders";

interface PostListProps extends PropsWithChildren, Pick<BoxProps, "className"> {
  initialData: Post[];
  initialMeta?: Meta;
}

export const PostList = ({
  children,
  initialData,
  initialMeta,
  className,
}: PostListProps) => {
  const [articles, setArticles] = useState<Post[]>([]);
  const [meta, setMeta] = useState<Meta | undefined>();
  const [isLoading, setLoading] = useState(false);

  const fetchData = useCallback(async (start: number = 0, filter?: string) => {
    setLoading(true);

    const { data, meta } = await getArticles(
      start,
      Number(process.env.NEXT_PUBLIC_PAGE_LIMIT),
      filter,
    );

    if (start === 0) {
      setArticles(data);
    } else {
      setArticles((prevData) => [...prevData, ...data]);
    }

    setMeta(meta);
    setLoading(false);
  }, []);

  function loadMorePosts(): void {
    const nextPosts = meta!.pagination.start + meta!.pagination.limit;
    fetchData(nextPosts);
  }

  useEffect(() => {
    setArticles(initialData);
    setMeta(initialMeta);
  }, [initialData, initialMeta]);

  return (
    <Container component="section" className={className}>
      {children}
      <Stack gap={0} className="pt-14 sm:pt-20">
        {articles.map((item) => (
          <PostItem key={item.id} {...item} />
        ))}
      </Stack>
      {meta &&
        meta.pagination.start + meta.pagination.limit <
          meta.pagination.total && (
          <div className="flex justify-center pt-14 sm:pt-20">
            <Button
              variant="outline"
              onClick={loadMorePosts}
              loading={isLoading}
              loaderProps={{
                type: "dots",
                size: "xl",
                color: "var(--app-color-beige)",
              }}
            >
              Load more posts
            </Button>
          </div>
        )}
    </Container>
  );
};
