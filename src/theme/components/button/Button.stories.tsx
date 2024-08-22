import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button, ButtonProps } from "@mantine/core";
import { IconMoodTongue } from "@tabler/icons-react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    size: {
      options: [
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "compact-xs",
        "compact-sm",
        "compact-md",
        "compact-lg",
        "compact-xl",
      ],
      control: "select",
    },
    variant: {
      options: [
        "primary",
        "filled",
        "light",
        "outline",
        "transparent",
        "white",
        "subtle",
        "default",
        "gradient",
      ],
      control: "radio",
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<ButtonProps>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: "Let’s get in touch",
    disabled: false,
    fullWidth: false,
  },
};

export const Outline: Story = {
  args: {
    ...Default.args,
    variant: "outline",
  },
};

// export const White: Story = {
//   args: {
//     ...Default.args,
//     variant: "white",
//   },
//   parameters: {
//     backgrounds: {
//       default: "dark",
//     },
//   },
// };

export const Transparent: Story = {
  args: {
    ...Default.args,
    variant: "transparent",
    rightSection: <IconMoodTongue />,
  },
};
