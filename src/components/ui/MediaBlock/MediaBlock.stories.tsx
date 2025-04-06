import { Meta, StoryObj } from "@storybook/react";
import { MediaBlock } from "./MediaBlock";

export default {
  component: MediaBlock,
} satisfies Meta<typeof MediaBlock>;

type Story = StoryObj<typeof MediaBlock>;

export const Default: Story = {
  args: {},
};
