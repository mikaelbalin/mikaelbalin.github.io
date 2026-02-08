import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Burger } from "#components/Burger";

const meta: Meta<typeof Burger> = {
  component: Burger,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const OneItem: Story = {
  args: {},
  render: function Render(args) {
    const [opened, setOpened] = useState(false);
    return (
      <Burger {...args} opened={opened} onClick={() => setOpened(!opened)} />
    );
  },
};
