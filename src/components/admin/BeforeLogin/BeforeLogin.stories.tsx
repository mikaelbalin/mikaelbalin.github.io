import type { Meta, StoryObj } from "@storybook/react";
import BeforeLogin from "./index";

const meta = {
  title: "BeforeLogin",
  component: BeforeLogin,
  tags: ["autodocs"],
} satisfies Meta<typeof BeforeLogin>;

export default meta;
type Story = StoryObj<typeof BeforeLogin>;

export const Default: Story = {
  args: {},
};
