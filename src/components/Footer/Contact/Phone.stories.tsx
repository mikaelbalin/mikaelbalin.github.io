import type { Meta, StoryObj } from "@storybook/react";
import { Phone } from "./Phone";

const meta: Meta<typeof Phone> = {
  component: Phone,
};
export default meta;

type Story = StoryObj<typeof Phone>;

export const Basic: Story = {
  args: {
    phone: "+1234567890",
  },
};
