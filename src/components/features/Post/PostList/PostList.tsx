import { Button, Container, Stack, Title } from "@mantine/core";
import { PostItem } from "@/components/features/Post/PostItem";
import { PropsWithChildren } from "react";

const posts = [
  {
    title: "Deploy to Fly via GitHub action",
    date: "2021-01-01",
    timeToRead: 5,
    tags: ["Fly", "GitHub"],
  },
  {
    title: "Decide to render a partial or not dynamically in Astro",
    date: "2021-01-02",
    timeToRead: 10,
    tags: ["Astro"],
  },
  {
    title: "How to use Mantine with Astro",
    date: "2021-01-03",
    timeToRead: 15,
    tags: ["Mantine", "Astro"],
  },
  {
    title: "Deploy to Vercel via GitHub action",
    date: "2021-01-04",
    timeToRead: 20,
    tags: ["Vercel", "GitHub"],
  },
  {
    title: "Deploy to Netlify via GitHub action",
    date: "2021-01-05",
    timeToRead: 25,
    tags: ["Netlify", "GitHub"],
  },
];

interface PostListProps extends PropsWithChildren {}

export const PostList = ({ children }: PostListProps) => {
  return (
    <Container component="section" className="pt-17">
      {children}
      <Stack gap={0} className="pt-14 mb-14 border-b">
        {posts.map((item) => (
          <PostItem key={item.title} {...item} />
        ))}
      </Stack>
      <div className="flex justify-center mb-14">
        <Button variant="outline">Load more post</Button>
      </div>
    </Container>
  );
};
