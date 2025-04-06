import type { Meta, StoryObj } from "@storybook/react";
import { Subscription } from "./Subscription";
import { Basic as SubscriptionForm } from "../forms/SubscriptionForm/SubscriptionForm.stories";
import { FormBlock, ReusableBlock } from "#types/payload";

const meta: Meta<typeof Subscription> = {
  component: Subscription,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<ReusableBlock>;

export const Basic: Story = {
  args: {
    block: {
      id: 1,
      name: "Subscription",
      blockType: [
        {
          title: "Stay in the Loop",
          text: "Subscribe to get the latest updates, tips, and exclusive insights delivered straight to your inbox. Never miss out on new content!",
          form: [SubscriptionForm.args as FormBlock],
          blockType: "subscription",
        },
      ],
      updatedAt: "2023-10-01T12:00:00Z",
      createdAt: "2023-10-01T12:00:00Z",
    },
    blockType: "reusableBlock",
  },
};
