import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Footer } from "./Footer";
import { Multiline as MarqueeStory } from "../Marquee/Marquee.stories";
import { Basic as ContactStory } from "./Contact/Contact.stories";
import { Basic as FooterNavigationStory } from "./FooterNavigation.stories";

const meta: Meta<typeof Footer> = {
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof Footer>;

export const Basic: Story = {
  args: {
    titles: MarqueeStory.args?.titles,
    ...ContactStory.args,
    navigation: FooterNavigationStory.args?.navigation,
  },
};
