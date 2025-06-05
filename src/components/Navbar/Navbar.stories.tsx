import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Navbar } from "./Navbar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: Navbar,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
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
        id: "67efeda1645cab84e2d0d5c1",
        link: {
          type: "custom",
          newTab: null,
          url: "/posts",
          label: "Blog",
        },
      },
      {
        id: "67efedaa645cab84e2d0d5c3",
        link: {
          type: "custom",
          newTab: null,
          url: "/#contact",
          label: "Contacts",
        },
      },
    ],
  },
};
