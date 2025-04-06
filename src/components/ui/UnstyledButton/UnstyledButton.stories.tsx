import type { Meta, StoryObj } from "@storybook/react";
import { UnstyledButton } from "./UnstyledButton";

const meta: Meta<typeof UnstyledButton> = {
  component: UnstyledButton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const OneItem: Story = {
  args: {
    children: "Unstyled Button",
  },
};
