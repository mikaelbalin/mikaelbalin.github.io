import type { Meta, StoryObj } from "@storybook/react";
import { Container, ContainerProps } from "@mantine/core";

const meta = {
  title: "Container",
  component: Container,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
  // args: { onClick: fn() },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<ContainerProps>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    bg: "var(--mantine-color-blue-light)",
    h: 50,
    mt: "md",
  },
};
