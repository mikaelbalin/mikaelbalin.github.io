import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthProvider } from "#context/auth-context";
import { AuthButton } from "./AuthButton";

const meta: Meta<typeof AuthButton> = {
  component: AuthButton,
  decorators: (Story) => (
    <AuthProvider>
      <Story />
    </AuthProvider>
  ),
};

export default meta;

type Story = StoryObj<typeof AuthButton>;

export const Default: Story = {
  args: {},
};
