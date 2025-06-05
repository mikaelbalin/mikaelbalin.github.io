import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  component: Input,
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter your email address",
  },
};

export const Filled: Story = {
  args: {
    variant: "filled",
    placeholder: "email@example.com",
  },
};

export const File: Story = {
  args: {
    type: "file",
    placeholder: "Upload an image",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
};
