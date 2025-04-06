import type { Meta, StoryObj } from "@storybook/react";

import { Title } from "#components/ui/Title";

const meta: Meta<typeof Title> = {
  component: Title,
  tags: ["autodocs"],
  args: {
    children: "Title Component",
  },
  argTypes: {
    order: {
      description: "Heading level (h1-h6)",
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6],
    },
    size: {
      description: "Font size variant (independent of heading level)",
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6],
    },
    asChild: {
      description: "Whether to merge props onto child element",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Title>;

export const Basic: Story = {
  args: {
    children: "Default Title (h1)",
  },
};

export const Heading2: Story = {
  args: {
    children: "Heading 2 (h2)",
    order: 2,
  },
};

export const Heading3: Story = {
  args: {
    children: "Heading 3 (h3)",
    order: 3,
  },
};

export const CustomSize: Story = {
  args: {
    children: "H3 with size 1 (largest)",
    order: 3,
    size: 1,
  },
};

export const AllHeadingLevels: Story = {
  render: () => (
    <div className="space-y-4">
      <Title order={1}>Heading 1</Title>
      <Title order={2}>Heading 2</Title>
      <Title order={3}>Heading 3</Title>
      <Title order={4}>Heading 4</Title>
      <Title order={5}>Heading 5</Title>
      <Title order={6}>Heading 6</Title>
    </div>
  ),
};

export const CustomSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Title order={2} size={1}>
        H2 with Size 1
      </Title>
      <Title order={2} size={3}>
        H2 with Size 3
      </Title>
      <Title order={2} size={5}>
        H2 with Size 5
      </Title>
    </div>
  ),
};
