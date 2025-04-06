import type { Meta, StoryObj } from "@storybook/react";
import { ArticleFooter } from "./ArticleFooter";

const meta: Meta<typeof ArticleFooter> = {
  component: ArticleFooter,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    url: "https://example.com/article",
  },
};
