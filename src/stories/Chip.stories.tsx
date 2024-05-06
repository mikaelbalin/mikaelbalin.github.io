import type { Meta, StoryObj } from "@storybook/react";
import { Chip, ChipProps } from "@mantine/core";
import { fn } from "@storybook/test";

const meta = {
  title: "Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "radio",
      options: ["checkbox", "radio"],
    },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<ChipProps>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: "Let’s get in touch",
    checked: false,
  },
};
