import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Header } from "#components/Header";

const meta: Meta<typeof Header> = {
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="relative min-h-20">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Header>;

export const Basic: Story = {
  args: {
    id: 1,
    logo: {
      link: {
        type: "custom",
        newTab: null,
        url: "/",
        label: "Mikael Balin",
      },
    },
    navItems: [
      {
        id: "67f28ff7d2308e73049c835e",
        link: {
          type: "custom",
          newTab: null,
          url: "/posts",
          label: "Blog",
        },
      },
      {
        id: "67f29000d2308e73049c8360",
        link: {
          type: "custom",
          newTab: null,
          url: "/#contact",
          label: "Contacts",
        },
      },
    ],
    updatedAt: "2025-04-06T14:30:34.585Z",
    createdAt: "2025-04-06T14:30:34.575Z",
  },
};
