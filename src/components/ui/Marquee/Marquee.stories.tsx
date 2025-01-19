import type { Meta, StoryObj } from "@storybook/react";
import { Marquee } from "./Marquee";
import "./story.css";

const meta = {
  title: "Marquee",
  component: Marquee,
  tags: ["autodocs"],
} satisfies Meta<typeof Marquee>;

export default meta;
type Story = StoryObj<typeof Marquee>;

export const Default: Story = {
  args: {
    titles: ["Hello", "Olá", "Hallå", "Bonjour"],
  },
};

export const Multiline: Story = {
  args: {
    titles: [
      ["Hello", "Olá", "Hallå", "Bonjour"],
      ["Hello", "Olá", "Hallå", "Bonjour"],
    ],
  },
  decorators: [
    (Story) => (
      <div className="flex items-center h-[200vh] overflow-hidden">
        <Story />
      </div>
    ),
  ],
};
