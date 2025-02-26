import type { Meta, StoryObj } from "@storybook/react";
import { PostSearch } from "./PostSearch";

const meta = {
  title: "PostSearch",
  component: PostSearch,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      // 👇 As in the Next.js application, next/navigation only works using App Router
      appDirectory: true,
    },
  },
} satisfies Meta<typeof PostSearch>;

export default meta;
type Story = StoryObj<typeof PostSearch>;

export const Default: Story = {
  args: {
    title: "Post Search",
    categories: [
      {
        id: 1,
        breadcrumbs: [
          {
            url: "/tag1",
            label: "Tag 1",
          },
          {
            url: "/tag2",
            label: "Tag 2",
          },
          {
            url: "/tag3",
            label: "Tag 3",
          },
        ],
      },
      {
        id: 2,
        breadcrumbs: [
          {
            url: "/tag4",
            label: "Tag 4",
          },
          {
            url: "/tag5",
            label: "Tag 5",
          },
          {
            url: "/tag6",
            label: "Tag 6",
          },
        ],
      },
    ],
  },
};
