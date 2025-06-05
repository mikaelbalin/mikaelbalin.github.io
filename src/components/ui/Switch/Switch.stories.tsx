import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Switch } from "#components/ui/Switch";

const meta: Meta<typeof Switch> = {
  component: Switch,
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Basic: Story = {};
