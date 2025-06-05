import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ShareButton } from "./ShareButton";

const meta: Meta<typeof ShareButton> = {
  component: ShareButton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Share",
    onClick: () => {
      alert("Share button clicked!");
    },
  },
};
