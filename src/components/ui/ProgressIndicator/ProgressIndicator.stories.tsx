import type { Meta, StoryObj } from "@storybook/react";
import { ProgressIndicator } from "./ProgressIndicator";
import { useRef } from "react";

const meta = {
  title: "ProgressIndicator",
  component: ProgressIndicator,
} satisfies Meta<typeof ProgressIndicator>;

export default meta;
type Story = StoryObj<typeof ProgressIndicator>;

export const Default: Story = {
  render: function Render() {
    const ref = useRef<HTMLDivElement>(null);
    return (
      <>
        <div className="bg-[var(--mantine-color-blue-light)] w-full h-10 mb-2" />
        <div className="flex h-screen">
          <div
            className="bg-[var(--mantine-color-blue-light)] w-32"
            id="content"
            ref={ref}
          />
          <div className="px-2">
            <ProgressIndicator targetId="content" />
          </div>
        </div>
        <div className="bg-[var(--mantine-color-blue-light)] w-full h-screen mt-2" />
      </>
    );
  },
};
