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
      <div>
        <div className="bg-[var(--mantine-color-blue-light)] w-full h-10 mb-2" />
        <div className="flex">
          <div
            className="bg-[var(--mantine-color-blue-light)] w-32 h-[3000px]"
            ref={ref}
          />
          <div className="px-2">
            <ProgressIndicator target={ref} />
          </div>
        </div>
        <div className="bg-[var(--mantine-color-blue-light)] w-full h-[600px] mt-2" />
      </div>
    );
  },
};
