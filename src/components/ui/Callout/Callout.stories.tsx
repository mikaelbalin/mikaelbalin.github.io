import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Callout } from "./Callout";

const meta = {
  component: Callout,
  tags: ["autodocs"],
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof Callout>;

export const Note: Story = {
  args: {
    blockName: "Info",
    children: "This is a callout",
    style: "note",
  },
};

export const Tip: Story = {
  args: {
    blockName: "Tip",
    children: "This is a callout",
    style: "tip",
  },
};

export const Important: Story = {
  args: {
    blockName: "Important",
    children: "This is a callout",
    style: "important",
  },
};
