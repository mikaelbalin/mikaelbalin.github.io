import type { Meta, StoryObj } from "@storybook/react";
import { PostItem } from "./PostItem";

const meta = {
  component: PostItem,
} satisfies Meta<typeof PostItem>;

export default meta;
type Story = StoryObj<typeof PostItem>;

export const Default: Story = {
  args: {
    title: "Hello, World!",
    slug: "hello-world",
    publishedAt: "2022-01-01T00:00:00Z",
    timeToRead: 5,
    relatedCategories: [
      {
        id: 1,
        createdAt: "2022-01-01T00:00:00Z",
        updatedAt: "2022-01-01T00:00:00Z",
        title: "Category 1",
      },
      {
        id: 2,
        createdAt: "2022-01-02T00:00:00Z",
        updatedAt: "2022-01-02T00:00:00Z",
        title: "Category 2",
      },
    ],
  },
};
