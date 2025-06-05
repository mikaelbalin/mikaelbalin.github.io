import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  component: Textarea,
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Basic: Story = {
  args: {},
};
