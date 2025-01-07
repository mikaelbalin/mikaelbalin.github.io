import type { Meta, StoryObj } from "@storybook/react";
import { List, ListProps, ListItem } from "@mantine/core";

const meta = {
  title: "List",
  component: List,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["unordered", "ordered"],
    },
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<ListProps>;

export const Default: Story = {
  args: {
    children: "Let’s get in touch",
    withPadding: false,
  },
  render: (args) => (
    <List {...args}>
      <ListItem>Clone or download repository from GitHub</ListItem>
      <ListItem>Install dependencies with yarn</ListItem>
    </List>
  ),
};
