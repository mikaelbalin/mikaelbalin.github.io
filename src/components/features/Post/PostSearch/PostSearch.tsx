"use client";

import { Category } from "@/types/payload";
import { Box, Chip, ChipGroup, Container, Group, Text } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PostSearchProps {
  categories: Pick<Category, "id" | "breadcrumbs">[];
}

export const PostSearch = ({ categories }: PostSearchProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    params.set("page", "1"); // Reset to page 1 when changing category
    return params.toString();
  };

  const handleCategoryChange = (value: string) => {
    const query = createQueryString("category", value);
    router.replace(`${pathname}?${query}`, {
      scroll: false,
    });
  };

  return (
    <Container component="section" className="pt-17">
      <Box>
        <Text className="mb-8">Search by category</Text>
        <ChipGroup
          multiple={false}
          value={category || "all"}
          onChange={handleCategoryChange}
        >
          <Group>
            <Chip value="all">All</Chip>
            {categories.map(({ id, breadcrumbs }) => {
              const breadcrumb = breadcrumbs?.[0];
              return breadcrumb ? (
                <Chip key={id} value={breadcrumb.url?.replace("/", "") || ""}>
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
