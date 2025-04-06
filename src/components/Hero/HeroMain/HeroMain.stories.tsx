import type { Meta, StoryObj } from "@storybook/react";
import { HeroMain } from "./HeroMain";

const meta = {
  component: HeroMain,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HeroMain>;

export default meta;
type Story = StoryObj<typeof HeroMain>;

export const Default: Story = {
  args: {
    titles: ["Hello", "Ciao", "Bonjour", "Hola"],
    description:
      "Experienced software engineer who finds joy in development and sharing insights with others.",
    contactLink: {
      link: {
        url: "/contacts",
        label: "Let’s get in touch",
      },
    },
    location: "New York, NY",
  },
};
