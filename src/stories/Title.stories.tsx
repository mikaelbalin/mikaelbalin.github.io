import type { Meta, StoryObj } from "@storybook/react";
import { Title } from "@mantine/core";

const meta = {
  title: "Typography/Title",
  component: Title,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof Title>;

export const TitleXXL: Story = {
  args: {
    children: "Let’s get in touch",
    order: 1,
  },
};

export const TitleXL: Story = {
  args: {
    ...TitleXXL.args,
    order: 2,
  },
};

export const TitleL: Story = {
  args: {
    ...TitleXXL.args,
    order: 3,
  },
};

export const TitleM: Story = {
  args: {
    ...TitleXXL.args,
    order: 4,
  },
};

export const TitleS: Story = {
  args: {
    ...TitleXXL.args,
    order: 5,
  },
};

export const TitleSBold: Story = {
  args: {
    ...TitleXXL.args,
    order: 5,
  },
};

export const TitleXS: Story = {
  args: {
    ...TitleXXL.args,
    order: 6,
  },
};
