import type { Meta, StoryObj } from "@storybook/react";
import { HomeOG } from "./HomeOG";

const meta = {
  title: "HomeOG",
  component: HomeOG,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          width: 1200,
          height: 630,
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HomeOG>;

export default meta;
type Story = StoryObj<typeof HomeOG>;

export const Default: Story = {
  args: {
    title: "mikaelbalin.com",
  },
};
