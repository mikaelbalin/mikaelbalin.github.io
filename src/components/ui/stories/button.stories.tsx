import { Meta, StoryObj } from "@storybook/react";
import { Button, type ButtonProps } from "@/components/ui/button";

export default {
  title: "shadcn/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

type Story = StoryObj<ButtonProps>;

export const Default: Story = {
  args: {
    variant: "outline",
    children: "Button",
  },
};
