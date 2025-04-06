import type { Meta, StoryObj } from "@storybook/react";
import { ArticleContent } from "./ArticleContent";

const meta: Meta<typeof ArticleContent> = {
  component: ArticleContent,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: {
      root: {
        children: [
          {
            type: "text",
            text: "Hello world!",
          },
        ],
      },
    },
  },
};
