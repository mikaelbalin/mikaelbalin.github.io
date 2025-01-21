import type { Meta, StoryObj } from "@storybook/react";
import { TextBullet } from "./TextBullet";

const meta = {
  title: "TextBullet",
  component: TextBullet,
} satisfies Meta<typeof TextBullet>;

export default meta;
type Story = StoryObj<typeof TextBullet>;

export const Default: Story = {
  args: {
    children: "Hello, World!",
  },
};
