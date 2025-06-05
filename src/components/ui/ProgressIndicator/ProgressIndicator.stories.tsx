import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProgressIndicator } from "./ProgressIndicator";
import { useRef } from "react";

const meta = {
  component: ProgressIndicator,
} satisfies Meta<typeof ProgressIndicator>;

export default meta;
type Story = StoryObj<typeof ProgressIndicator>;

export const Default: Story = {
  render: function Render() {
    const ref = useRef<HTMLDivElement>(null);
    return (
      <>
        <div className="mb-2 h-10 w-full bg-emerald-100" />
        <div className="flex h-screen">
          <div className="w-32 bg-emerald-100" id="content" ref={ref} />
          <div className="px-2">
            <ProgressIndicator targetId="content" />
          </div>
        </div>
        <div className="mt-2 h-screen w-full bg-emerald-100" />
      </>
    );
  },
};
