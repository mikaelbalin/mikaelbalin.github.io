import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Text } from "#components/ui/Text";

const meta: Meta<typeof Text> = {
  component: Text,
  tags: ["autodocs"],
  args: {
    children:
      "The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.",
  },
  argTypes: {
    size: {
      description: "Text size variant",
      control: { type: "select" },
      options: ["xs", "sm", "base", "lg", "xl"],
    },
    weight: {
      description: "Font weight",
      control: { type: "select" },
      options: ["normal", "medium", "semibold", "bold"],
    },
    asChild: {
      description: "Whether to merge props onto child element",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Text>;

export const Basic: Story = {
  args: {
    children:
      "The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.",
  },
};

export const Small: Story = {
  args: {
    children:
      "This is small text that could be used for captions or helper text.",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "This is larger text that could be used for important content.",
    size: "lg",
  },
};

export const Bold: Story = {
  args: {
    children: "This is bold text to emphasize important information.",
    weight: "bold",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Text size="sm">Small Text</Text>
      <Text size="base">Base Text (Default)</Text>
      <Text size="lg">Large Text</Text>
    </div>
  ),
};

export const AllWeights: Story = {
  render: () => (
    <div className="space-y-4">
      <Text weight="normal">Normal weight text (Default)</Text>
      <Text weight="medium">Medium weight text</Text>
      <Text weight="semibold">Semibold weight text</Text>
      <Text weight="bold">Bold weight text</Text>
    </div>
  ),
};

export const Combinations: Story = {
  render: () => (
    <div className="space-y-4">
      <Text size="sm" weight="bold">
        Small bold text
      </Text>
      <Text size="lg" weight="medium">
        Large medium weight text
      </Text>
    </div>
  ),
};
