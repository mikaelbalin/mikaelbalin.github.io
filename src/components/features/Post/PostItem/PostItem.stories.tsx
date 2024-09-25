import type { Meta, StoryObj } from "@storybook/react";
import { PostItem } from "./PostItem";

const meta = {
  title: "PostItem",
  component: PostItem,
  tags: ["autodocs"],
} satisfies Meta<typeof PostItem>;

export default meta;
type Story = StoryObj<typeof PostItem>;

export const Default: Story = {
  args: {
    title: "Hello, World!",
    slug: "hello-world",
    publishedAt: "2022-01-01T00:00:00Z",
    tags: [
      {
        id: 1,
        documentId: "",
        createdAt: "2024-09-22T13:45:43.408Z",
        updatedAt: "2024-09-22T13:45:43.408Z",
        publishedAt: "2024-09-22T13:45:43.411Z",
        locale: null,
        name: "React",
        slug: "react",
      },
      {
        id: 2,
        documentId: "",
        createdAt: "2024-09-22T13:44:25.981Z",
        updatedAt: "2024-09-22T13:44:25.981Z",
        publishedAt: "2024-09-22T13:44:25.985Z",
        locale: null,
        name: "Next. JS",
        slug: "next-js",
      },
    ],
  },
};
