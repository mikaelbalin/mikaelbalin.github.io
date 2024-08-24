import { Button, Stack, Title } from "@mantine/core";

export const PostLatest = () => {
  return (
    <Stack className="gap-0 items-start sm:flex-row sm:items-center sm:justify-between">
      <Title
        order={2}
        className="!text-3.5xl !leading-normal mb-8 md:!text-8xl sm:mb-0"
      >
        Latest blog posts
      </Title>
      <Button variant="outline">View all blog posts</Button>
    </Stack>
  );
};
