import type { Meta, StoryObj } from "@storybook/react";
import { TextInput, TextInputProps } from "@mantine/core";

const meta = {
  title: "TextInput",
  component: TextInput,
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
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<TextInputProps>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    label: "Input label",
    description: "Input description",
    placeholder: "Input placeholder",
    withAsterisk: false,
  },
};