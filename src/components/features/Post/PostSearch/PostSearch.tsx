"use client";

import { Category } from "@/types/payload";
import { Box, Chip, ChipGroup, Container, Group, Text } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";

interface PostSearchProps {
  categories: Pick<Category, "id" | "breadcrumbs">[];
}

export const PostSearch = ({ categories }: PostSearchProps) => {
  const params = useParams<{ lang: string; tag?: string }>();
  const router = useRouter();

  function filterPosts(value: string): void {
    router.push(`/posts/tags/${value}`);
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
            {categories.map(({ id, breadcrumbs }) => {
              const breadcrumb = breadcrumbs?.[0];
              return breadcrumb ? (
                <Chip key={id} value={breadcrumb.url || ""}>
                  {breadcrumb.label}
                </Chip>
              ) : null;
            })}
          </Group>
        </ChipGroup>
      </Box>
    </Container>
  );
};
