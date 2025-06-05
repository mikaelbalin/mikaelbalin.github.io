import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { LiveTime } from "#components/LiveTime";

const meta: Meta<typeof LiveTime> = {
  component: LiveTime,
};
export default meta;

type Story = StoryObj<typeof LiveTime>;

export const Basic: Story = {};
