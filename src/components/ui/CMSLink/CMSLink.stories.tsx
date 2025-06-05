import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CMSLink } from "./CMSLink";

const meta = {
  component: CMSLink,
} satisfies Meta<typeof CMSLink>;

export default meta;
type Story = StoryObj<typeof CMSLink>;

export const Default: Story = {
  args: {
    newTab: false,
    type: "custom",
    url: "https://ui.shadcn.com/docs/react-19#upgrade-status",
    children: "Shadcn UI Docs",
  },
};
