import type { Meta, StoryObj } from "@storybook/react";
import { SubscriptionForm } from "./SubscriptionForm";

const meta: Meta<typeof SubscriptionForm> = {
  component: SubscriptionForm,
  parameters: {
    backgrounds: {
      default: "Shadow earth",
      values: [
        // 👇 Add a new value
        { name: "Shadow earth", value: "var(--color-shadow-earth)" },
      ],
    },
  },
};
export default meta;

type Story = StoryObj<typeof SubscriptionForm>;

export const Basic: Story = {
  args: {
    blockType: "formBlock",
    blockName: "subscription-form",
    id: "subscription-form",
    form: {
      submitButtonLabel: "Subscribe",
      id: 1,
      title: "Subscribe to our newsletter",
      updatedAt: "2023-10-01T12:00:00Z",
      createdAt: "2023-10-01T12:00:00Z",
      fields: [
        {
          label: "Email",
          name: "email",
          id: "email",
          required: true,
          blockType: "email",
        },
      ],
    },
  },
};
