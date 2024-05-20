import type { Meta, ReactRenderer, StoryFn, StoryObj } from "@storybook/react";
import { HeroBackground } from "./HeroBackground";
import { PropsWithChildren, ReactNode, useRef } from "react";
import { RootRefContext } from "../../context";

const Wrapper = ({ children }: PropsWithChildren) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  return (
    <RootRefContext.Provider value={rootRef}>
      <div ref={rootRef}>{children}</div>
    </RootRefContext.Provider>
  );
};

const meta = {
  title: "HeroBackground",
  component: HeroBackground,
  tags: ["autodocs"],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  decorators: (Story) => {
    return (
      <Wrapper>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </Wrapper>
    );
  },
} satisfies Meta<typeof HeroBackground>;

export default meta;
type Story = StoryObj<typeof HeroBackground>;

export const Default: Story = {
  args: {},
};
