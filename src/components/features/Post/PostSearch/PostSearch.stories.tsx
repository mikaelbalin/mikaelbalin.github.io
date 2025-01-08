import type { Meta, StoryObj } from "@storybook/react";
import { PostSearch } from "./PostSearch";

const meta = {
  title: "PostSearch",
  component: PostSearch,
  tags: ["autodocs"],
} satisfies Meta<typeof PostSearch>;

export default meta;
type Story = StoryObj<typeof PostSearch>;

export const Default: Story = {
  args: {
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
        ],
      },
    ],
  },
};
