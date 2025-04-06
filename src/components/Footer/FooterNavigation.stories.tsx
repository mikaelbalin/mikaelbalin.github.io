import type { Meta, StoryObj } from "@storybook/react";
import { FooterNavigation } from "./FooterNavigation";

const meta: Meta<typeof FooterNavigation> = {
  component: FooterNavigation,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof FooterNavigation>;

export const Basic: Story = {
  args: {
    navigation: {
      title: "Navigation",
      topButton: "Back to top",
      navItems: [
        {
          link: {
            label: "Home",
            url: "/",
          },
        },
        {
          link: {
            label: "About",
            url: "/about",
          },
        },
        {
          link: {
            label: "Services",
            url: "/services",
          },
        },
        {
          link: {
            label: "Contact",
            url: "/contact",
          },
        },
      ],
    },
  },
};
