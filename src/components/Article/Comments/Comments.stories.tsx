import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { Comments } from "./Comments";

const meta: Meta<typeof Comments> = {
  component: Comments,
};

export default meta;

type Story = StoryObj<typeof Comments>;

export const Basic: Story = {
  args: {
    uri: "at://did:plc:example/app.bsky.feed.post/123",
  },
};

export const OpensDrawer: Story = {
  args: {
    uri: "at://did:plc:example/app.bsky.feed.post/123",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /comments/i });

    await userEvent.click(button);

    // The drawer renders in a portal, so query the document body.
    const body = within(document.body);
    await expect(body.getByText("Comments")).toBeInTheDocument();
  },
};
