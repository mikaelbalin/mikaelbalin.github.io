import type { Meta, StoryObj } from "@storybook/react";
import { Textarea, TextareaProps } from "@mantine/core";

const meta = {
  title: "Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["filled", "unstyled"],
      control: "radio",
    },
  },
  // args: { onClick: fn() },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<TextareaProps>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    label: "Input label",
    description: "Input description",
    placeholder: "Input placeholder",
    withAsterisk: false,
  },
};