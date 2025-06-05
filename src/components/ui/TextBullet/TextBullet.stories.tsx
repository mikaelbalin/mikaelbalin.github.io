import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextBullet } from "./TextBullet";

const meta = {
  component: TextBullet,
} satisfies Meta<typeof TextBullet>;

export default meta;
type Story = StoryObj<typeof TextBullet>;

export const Default: Story = {
  args: {
    children: "Hello, World!",
  },
};
