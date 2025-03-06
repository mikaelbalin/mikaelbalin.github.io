import { Meta, StoryObj } from "@storybook/react";
import { CodeHighlight, CodeHighlightProps } from "./CodeHighlight";

export default {
  title: "CodeHighlight",
  component: CodeHighlight,
  tags: ["autodocs"],
} satisfies Meta<typeof CodeHighlight>;

type Story = StoryObj<CodeHighlightProps>;

export const Default: Story = {
  args: {
    code: `import { Avatar } from '@mantine/core';
import image from './image.png';

export function AvatarDemo() {
  return <Avatar src={image} alt="it's me" />;
}`,
  },
};
