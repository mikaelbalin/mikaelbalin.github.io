import type { Meta, StoryObj } from "@storybook/react";
import { AdminBar } from "./index";

const meta = {
  title: "AdminBar",
  component: AdminBar,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      // 👇 As in the Next.js application, next/navigation only works using App Router
      appDirectory: true,
    },
  },
} satisfies Meta<typeof AdminBar>;

export default meta;
type Story = StoryObj<typeof AdminBar>;

export const Default: Story = {
  args: {
    adminBarProps: {
      preview: false,
    },
  },
};
