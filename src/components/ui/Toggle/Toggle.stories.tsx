import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconIceCream2 } from "@tabler/icons-react";
import { Toggle } from "./Toggle";

const meta = {
  component: Toggle,
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    children: <IconIceCream2 />,
    "aria-label": "Example toggle",
  },
};
