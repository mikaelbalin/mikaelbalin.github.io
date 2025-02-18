import type { Meta, StoryObj } from "@storybook/react";
import { OGHome } from "./OGHome";

const meta = {
  title: "OGHome",
  component: OGHome,
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
} satisfies Meta<typeof OGHome>;

export default meta;
type Story = StoryObj<typeof OGHome>;

export const Default: Story = {
  args: {
    title: "mikaelbalin.com",
  },
};
