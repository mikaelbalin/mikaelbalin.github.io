import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ModeToggle } from "#components/ModeToggle";

const meta: Meta<typeof ModeToggle> = {
  component: ModeToggle,
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof ModeToggle>;

export const Basic: Story = {};
