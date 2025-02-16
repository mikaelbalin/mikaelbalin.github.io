import type { ArchiveBlock } from "@/types/payload";
import { Button, Stack, Title } from "@mantine/core";
import Link from "next/link";

type PostLatestProps = Pick<ArchiveBlock, "title" | "latestPostsLink">;

export const PostLatest = (props: PostLatestProps) => {
  const { title, latestPostsLink } = props;
  return (
    <Stack className="gap-4 items-start sm:flex-row sm:items-center sm:justify-between pt-16 sm:pt-24">
      <Title
        order={2}
        className="!text-3.5xl !leading-normal mb-8 md:!text-8xl sm:mb-0"
      >
        {title}
      </Title>
      <Button
        component={Link}
        href={latestPostsLink.url || ""}
        variant="outline"
      >
        {latestPostsLink.label}
      </Button>
    </Stack>
  );
};
