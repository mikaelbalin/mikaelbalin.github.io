import type { Meta, StoryObj } from "@storybook/react";
import { ScrollTopButton } from "./ScrollTopButton";

const meta: Meta<typeof ScrollTopButton> = {
  component: ScrollTopButton,
};
export default meta;

type Story = StoryObj<typeof ScrollTopButton>;

export const Basic: Story = {
  args: {
    title: "Back to top",
  },
};
