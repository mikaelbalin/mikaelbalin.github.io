"use client";

import { TagListResponseDataItem } from "@/types/data";
import { Box, Chip, ChipGroup, Group, Text } from "@mantine/core";
import { useState } from "react";

interface PostSearchProps {
  tags: TagListResponseDataItem[];
}

export const PostSearch = ({ tags }: PostSearchProps) => {
  // string value when multiple is false (default)
  const [value, setValue] = useState("all");

  return (
    <Box>
      <Text className="mb-8">Search by category</Text>
      <ChipGroup multiple={false} value={value} onChange={setValue}>
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
  );
};
