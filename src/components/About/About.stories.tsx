import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { About } from "#components/About";

const meta: Meta<typeof About> = {
  component: About,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof About>;

export const Basic: Story = {
  args: {
    title: "About Me",
    description:
      "I am a software engineer with a passion for building web applications.",
  },
};
