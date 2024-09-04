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
    tags: {
      data: [
        { id: 1, attributes: { name: "Html", slug: "" } },
        { id: 2, attributes: { name: "vscode", slug: "" } },
      ],
    },
  },
};
