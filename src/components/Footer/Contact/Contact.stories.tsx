import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Contact } from "./Contact";
import { Basic as ContactFormProps } from "../../forms/ContactForm/ContactForm.stories";
import { FormBlock } from "#types/payload";

const meta: Meta<typeof Contact> = {
  component: Contact,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof Contact>;

export const Basic: Story = {
  args: {
    contacts: {
      title: "Contact Us",
      email: "example@mail.com",
      phone: "+1234567890",
    },
    social: {
      title: "Follow Us",
      socialItems: [
        {
          id: "1",
          link: {
            label: "Facebook",
            url: "https://facebook.com",
          },
        },
        {
          id: "2",
          link: {
            label: "Twitter",
            url: "https://twitter.com",
          },
        },
      ],
    },
    form: [ContactFormProps.args as FormBlock],
  },
};
