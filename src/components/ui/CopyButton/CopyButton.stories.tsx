import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CopyButton } from "./CopyButton";

const meta: Meta<typeof CopyButton> = {
  component: CopyButton,
  parameters: {
    backgrounds: {
      default: "Dark",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const OneItem: Story = {
  args: {
    code: "const a = 1",
    className: "static",
  },
};
