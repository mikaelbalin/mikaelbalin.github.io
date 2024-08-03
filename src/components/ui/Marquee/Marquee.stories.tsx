import type { Meta, StoryObj } from "@storybook/react";
import { Marquee } from "./Marquee";

const meta = {
  title: "Marquee",
  component: Marquee,
  tags: ["autodocs"],
} satisfies Meta<typeof Marquee>;

export default meta;
type Story = StoryObj<typeof Marquee>;

export const Default: Story = {
  args: {
    texts: ["Hello", "Olá", "Hallå", "Bonjour"],
  },
};
