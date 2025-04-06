import type { Meta, StoryObj } from "@storybook/react";
import BeforeLogin from "./index";

const meta = {
  component: BeforeLogin,
} satisfies Meta<typeof BeforeLogin>;

export default meta;
type Story = StoryObj<typeof BeforeLogin>;

export const Default: Story = {
  args: {},
};
