"use client";

import { Box, Chip, ChipGroup, Container, Group, Text } from "@mantine/core";
import { useState } from "react";

export const PostSearch = () => {
  // string value when multiple is false (default)
  const [value, setValue] = useState("all");

  return (
    <Box>
      <Text className="mb-8">Search by category</Text>
      <ChipGroup multiple={false} value={value} onChange={setValue}>
        <Group>
          <Chip value="all">All</Chip>
          <Chip value="react">React</Chip>
          <Chip value="ng">Angular</Chip>
          <Chip value="svelte">Svelte</Chip>
          <Chip value="vue">Vue</Chip>
        </Group>
      </ChipGroup>
    </Box>
  );
};
