import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HeroBlog } from "./HeroBlog";

const meta = {
  component: HeroBlog,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HeroBlog>;

export default meta;
type Story = StoryObj<typeof HeroBlog>;

export const Default: Story = {
  args: {
    title: "Blog",
  },
};
