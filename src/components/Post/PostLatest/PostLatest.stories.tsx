import type { Meta, StoryObj } from "@storybook/react";
import { PostLatest } from "./PostLatest";

const meta = {
  component: PostLatest,
} satisfies Meta<typeof PostLatest>;

export default meta;
type Story = StoryObj<typeof PostLatest>;

export const Default: Story = {
  args: {
    title: "Lates blog post",
    latestPostsLink: {
      url: "/latest-posts",
      label: "View all blog post",
    },
    locale: "en",
  },
};
