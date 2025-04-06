import type { Meta, StoryObj } from "@storybook/react";
import { ContactForm } from "./ContactForm";

const meta: Meta<typeof ContactForm> = {
  component: ContactForm,
};
export default meta;

type Story = StoryObj<typeof ContactForm>;

export const Basic: Story = {
  args: {
    blockType: "formBlock",
    blockName: "contact-form",
    id: "contact-form",
    form: {
      submitButtonLabel: "Submit message",
      id: 1,
      title: "Send me a message",
      updatedAt: "2023-10-01T12:00:00Z",
      createdAt: "2023-10-01T12:00:00Z",
      fields: [
        {
          label: "Name",
          name: "name",
          id: "name",
          required: true,
          blockType: "text",
        },
        {
          label: "Email",
          name: "email",
          id: "email",
          required: true,
          blockType: "email",
        },
        {
          label: "Message",
          name: "message",
          id: "message",
          required: true,
          blockType: "textarea",
        },
        {
          label: "Terms and conditions",
          name: "terms",
          id: "terms",
          required: true,
          blockType: "checkbox",
        },
        {
          label: "Subscribe to newsletter",
          name: "subscribe",
          id: "subscribe",
          required: true,
          blockType: "checkbox",
        },
      ],
    },
  },
};
