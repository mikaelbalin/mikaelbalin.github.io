"use client";

import {
  Button,
  Container,
  Stack,
  Box,
  Chip,
  ChipGroup,
  Group,
  Text,
} from "@mantine/core";
import { PostItem } from "@/components/features/Post/PostItem";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import {
  ArticleListResponseDataItem,
  Meta,
  TagListResponseDataItem,
} from "@/types/data";
import { getArticles } from "@/data/loaders";

interface PostListProps extends PropsWithChildren {
  initialData: ArticleListResponseDataItem[];
  initialMeta?: Meta;
  tags?: TagListResponseDataItem[];
}

export const PostList = ({
  children,
  initialData,
  initialMeta,
  tags,
}: PostListProps) => {
  const [articles, setArticles] = useState<ArticleListResponseDataItem[]>([]);
  const [meta, setMeta] = useState<Meta | undefined>();
  const [isLoading, setLoading] = useState(false);
  const [tag, setTag] = useState("all");

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

  function filterPosts(value: string): void {
    setTag(value);
    fetchData(0, value === "all" ? undefined : value);
  }

  useEffect(() => {
    setArticles(initialData);
    setMeta(initialMeta);
  }, [initialData, initialMeta]);

  return (
    <Container component="section" className="pt-17">
      {tags ? (
        <Box>
          <Text className="mb-8">Search by category</Text>
          <ChipGroup multiple={false} value={tag} onChange={filterPosts}>
            <Group>
              <Chip value="all">All</Chip>
              {tags.map(({ id, attributes: { slug, name } }) => (
                <Chip key={id} value={slug}>
                  {name}
                </Chip>
              ))}
            </Group>
          </ChipGroup>
        </Box>
      ) : (
        children
      )}
      <Stack gap={0} className="pt-14 border-b sm:pt-20">
        {articles.map((item) => (
          <PostItem key={item.id} {...item.attributes} />
        ))}
      </Stack>
      {tags &&
        meta &&
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
