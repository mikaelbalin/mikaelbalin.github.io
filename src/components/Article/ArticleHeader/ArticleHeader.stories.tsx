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
      {
        id: 1,
        title: "Postgres",
        updatedAt: "2024-01-01T12:00:00Z",
        createdAt: "2024-01-01T12:00:00Z",
      },

      {
        id: 4,
        title: "Data",
        updatedAt: "2024-01-01T13:00:00Z",
        createdAt: "2024-01-01T13:00:00Z",
      },
    ],
  },
};
