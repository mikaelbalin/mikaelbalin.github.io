import type { Meta, StoryObj } from "@storybook/react";
import { OGBlog } from "./OGBlog";

const meta = {
  title: "OGBlog",
  component: OGBlog,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OGBlog>;

export default meta;
type Story = StoryObj<typeof OGBlog>;

export const Default: Story = {
  args: {
    title: "Title",
  },
};
