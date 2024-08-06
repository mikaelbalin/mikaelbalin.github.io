import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@mantine/core";

const meta = {
  title: "Typography/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    truncate: {
      options: ["end", "start", true, false],
      control: { type: "select" },
    },
    lineClamp: {
      control: { type: "number" },
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof Text>;

export const Paragraph: Story = {
  args: {
    children: "Let’s get in touch",
    span: false,
  },
};

export const ParagraphBig: Story = {
  args: {
    ...Paragraph.args,
    size: "lg",
  },
};

export const Tiny: Story = {
  args: {
    ...Paragraph.args,
    size: "sm",
  },
};

export const ParagraphBold: Story = {
  args: {
    ...Paragraph.args,
    fw: 700,
  },
};

export const ParagraphLink: Story = {
  args: {
    ...Paragraph.args,
    size: "xl",
  },
};
