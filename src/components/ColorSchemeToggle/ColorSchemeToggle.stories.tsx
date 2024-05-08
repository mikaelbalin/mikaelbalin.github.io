import type { Meta, StoryObj } from "@storybook/react";
import { ColorSchemeToggle } from "./ColorSchemeToggle";

const meta = {
  title: "Color Scheme Toggle",
  component: ColorSchemeToggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ColorSchemeToggle>;

export default meta;
type Story = StoryObj<typeof ColorSchemeToggle>;

export const Default: Story = {
  args: {},
};
