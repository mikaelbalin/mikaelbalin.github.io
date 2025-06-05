import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Label } from "#components/ui/Label";

const meta: Meta<typeof Label> = {
  component: Label,
};
export default meta;

type Story = StoryObj<typeof Label>;

export const Basic: Story = {
  args: {
    htmlFor: "email",
    children: "Your email address",
  },
};
