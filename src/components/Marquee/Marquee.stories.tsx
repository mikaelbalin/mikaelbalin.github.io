import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Marquee } from "./Marquee";

const meta = {
  component: Marquee,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Marquee>;

export default meta;
type Story = StoryObj<typeof Marquee>;

export const Default: Story = {
  args: {
    titles: ["Hello", "Bonjour", "Olá", "Hallå"],
  },
};

export const Multiline: Story = {
  args: {
    titles: [
      ["Hello", "Olá", "Hallå", "Bonjour"],
      ["Bonjour", "Hello", "Olá", "Hallå"],
    ],
  },
  decorators: [
    (Story) => (
      <div className="flex h-[200vh] items-center">
        <Story />
      </div>
    ),
  ],
};
