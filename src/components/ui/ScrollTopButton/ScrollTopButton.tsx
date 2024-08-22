"use client";

import { Button } from "@mantine/core";
import { IconArrowNarrowUp } from "@tabler/icons-react";

export const ScrollTopButton = () => (
  <Button
    rightSection={<IconArrowNarrowUp />}
    variant="transparent"
    className="mt-10"
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  >
    Back to top
  </Button>
);
