import type { Meta, StoryObj } from "@storybook/react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "#components/ui/Collapsible";

const meta: Meta<typeof Collapsible> = {
  component: Collapsible,
};
export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Basic: Story = {
  args: {},
  render: function Render() {
    return (
      <Collapsible>
        <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
        <CollapsibleContent>
          Yes. Free to use for personal and commercial projects. No attribution
          required.
        </CollapsibleContent>
      </Collapsible>
    );
  },
};
