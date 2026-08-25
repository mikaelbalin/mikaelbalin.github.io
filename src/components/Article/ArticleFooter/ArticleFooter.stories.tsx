import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthProvider } from "#context/auth-context";
import { ArticleFooter } from "./ArticleFooter";

const meta: Meta<typeof ArticleFooter> = {
  component: ArticleFooter,
  parameters: {
    layout: "fullscreen",
  },
  decorators: (Story) => (
    <AuthProvider>
      <Story />
    </AuthProvider>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    url: "https://example.com/article",
  },
};

export const WithComments: Story = {
  args: {
    url: "https://example.com/article",
    bskyPostUri: "at://did:plc:example/app.bsky.feed.post/123",
  },
};
