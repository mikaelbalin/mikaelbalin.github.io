import { Unsubscribe } from "#components/Unsubscribe";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Unsubscribe> = {
  component: Unsubscribe,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof Unsubscribe>;

export const Default: Story = {
  args: {},
};
