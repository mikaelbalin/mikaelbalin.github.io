import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "#components/Container";

const meta: Meta<typeof Container> = {
  component: Container,
};
export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    className: "h-50 bg-sky-100",
  },
};
