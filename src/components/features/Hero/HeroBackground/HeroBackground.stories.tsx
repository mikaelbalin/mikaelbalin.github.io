import type { Meta, StoryObj } from "@storybook/react";
import { HeroBackground } from "./HeroBackground";
import { MotionProvider } from "@/context/motion-context";

const meta = {
  title: "HeroBackground",
  component: HeroBackground,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    variant: {
      options: ["default", "blog"],
      control: { type: "radio" },
    },
    children: { table: { disable: true } },
  },
  decorators: (Story) => (
    <MotionProvider>
      {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
      <Story />
    </MotionProvider>
  ),
} satisfies Meta<typeof HeroBackground>;

export default meta;
type Story = StoryObj<typeof HeroBackground>;

export const Default: Story = {
  args: {
    variant: "default",
    children: <div className="h-96" />,
  },
};

export const Blog: Story = {
  args: {
    variant: "blog",
    children: <div className="h-96" />,
  },
};
