import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleHeader } from "./ArticleHeader";

const meta: Meta<typeof ArticleHeader> = {
  component: ArticleHeader,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Migrate data from Postgres",
    date: "January 1, 2024",
    timeToRead: 5,
    categories: [
      { id: "1", title: "Postgres" },
      { id: "4", title: "Data" },
    ],
  },
};
