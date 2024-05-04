import { Button, Container, Stack, Title } from "@mantine/core";
import { PostCard } from "../PostCard";

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

export const BlogPosts = () => {
  return (
    <Container component="section">
      <Stack mb={56}>
        <Title>Lates blog posts</Title>
        <Button>View all blog posts</Button>
      </Stack>
      <Stack gap={0}>
        {posts.map((item) => (
          <PostCard key={item.title} {...item} />
        ))}
      </Stack>
    </Container>
  );
};
