import { PostLatestProps } from "@/types/data";
import { Button, Stack, Title } from "@mantine/core";
import Link from "next/link";

export const PostLatest = (props: PostLatestProps) => {
  const { latestPostsLink, latestPostsTitle } = props;
  return (
    <Stack className="gap-0 items-start sm:flex-row sm:items-center sm:justify-between pt-16 sm:pt-24">
      <Title
        order={2}
        className="!text-3.5xl !leading-normal mb-8 md:!text-8xl sm:mb-0"
      >
        {latestPostsTitle}
      </Title>
      <Button component={Link} href={latestPostsLink.url} variant="outline">
        {latestPostsLink.text}
      </Button>
    </Stack>
  );
};
