import type { Meta, StoryObj } from "@storybook/react";
import App from "./VirtualBadge";

const meta = {
  title: "VirtualBadge",
  component: App,
  decorators: [
    (Story) => (
      <div
        style={{ width: "calc(100vw - 32px)", height: "calc(100vh - 32px)" }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof App>;

export const Default: Story = {
  args: {
    debug: false,
  },
};
