import type { Meta, StoryObj } from "@storybook/nextjs-vite";
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
