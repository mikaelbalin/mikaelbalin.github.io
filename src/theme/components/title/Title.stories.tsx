import type { Meta, StoryObj } from "@storybook/react";
import {
  Title,
  // TitleProps
} from "@mantine/core";
// import { UnionToTuple } from "@/types/union-to-tuple";

// type TextWrapOptions = UnionToTuple<NonNullable<TitleProps["textWrap"]>>;

const meta = {
  title: "Typography/Title",
  component: Title,
  tags: ["autodocs"],
  argTypes: {
    textWrap: {
      options: ["wrap", "nowrap", "balance", "pretty", "stable"],
      control: { type: "select" },
    },
    lineClamp: {
      control: { type: "number" },
    },
  },
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
