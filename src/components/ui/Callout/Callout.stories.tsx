import type { Meta, StoryObj } from "@storybook/react";
import { Callout } from "./Callout";

const meta = {
  title: "Callout",
  component: Callout,
  tags: ["autodocs"],
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof Callout>;

export const Default: Story = {
  args: {
    blockName: "Info",
    children: "This is a callout",
    style: "note",
  },
};
