import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { LoginForm } from "./LoginForm";

const meta: Meta<typeof LoginForm> = {
  component: LoginForm,
};
export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Basic: Story = {
  args: {},
};

export const FilledForm: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const handleInput = canvas.getByLabelText(/bluesky handle/i);

    await userEvent.type(handleInput, "mikaelbalin.bsky.social");

    await expect(handleInput).toHaveValue("mikaelbalin.bsky.social");
  },
};

// Accessibility focused story
export const AccessibilityTest: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const handleInput = canvas.getByLabelText(/bluesky handle/i);
    const loginButton = canvas.getByRole("button", {
      name: /sign in with bluesky/i,
    });

    // Check that the form can be navigated with keyboard
    await userEvent.tab();
    await expect(handleInput).toHaveFocus();

    await userEvent.tab();
    await expect(loginButton).toHaveFocus();

    // Check ARIA labels and roles
    await expect(handleInput).toHaveAttribute("type", "text");
    await expect(loginButton).toHaveAttribute("type", "submit");
  },
};
