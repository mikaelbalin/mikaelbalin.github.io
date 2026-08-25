import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthButton } from "./AuthButton";

const meta: Meta<typeof AuthButton> = {
  component: AuthButton,
};

export default meta;

type Story = StoryObj<typeof AuthButton>;

export const Default: Story = {
  args: {},
};
