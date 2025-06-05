import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";
import { IconBold, IconItalic, IconUnderline } from "@tabler/icons-react";
import { useArgs } from "storybook/preview-api";

const meta = {
  component: ToggleGroup,
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  args: {
    value: ["bold", "italic"],
  },
  render: function Render() {
    const [{ value }, updateArgs] = useArgs();

    function handleValueChange(value: string[]) {
      if (value) updateArgs({ value });
    }

    return (
      <ToggleGroup
        type="multiple"
        value={value}
        onValueChange={handleValueChange}
      >
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <IconBold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <IconItalic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="strikethrough"
          aria-label="Toggle strikethrough"
        >
          <IconUnderline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
};
