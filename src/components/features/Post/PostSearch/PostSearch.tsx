"use client";

import { TagListResponseDataItem } from "@/types/data";
import { Box, Chip, ChipGroup, Container, Group, Text } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";

interface PostSearchProps {
  tags: TagListResponseDataItem[];
}

export const PostSearch = ({ tags }: PostSearchProps) => {
  const params = useParams<{ lang: string; tag?: string }>();
  const router = useRouter();

  function filterPosts(value: string): void {
    router.push(`/blog/tags/${value}`);
  }

  return (
    <Container component="section" className="pt-17">
      <Box>
        <Text className="mb-8">Search by category</Text>
        <ChipGroup
          multiple={false}
          value={params.tag || "all"}
          onChange={filterPosts}
        >
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
    </Container>
  );
};
