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

    const emailInput = canvas.getByLabelText(/email/i);
    const passwordInput = canvas.getByLabelText(/password/i);

    await userEvent.type(emailInput, "john@example.com");
    await userEvent.type(passwordInput, "supersecret");

    await expect(emailInput).toHaveValue("john@example.com");
    await expect(passwordInput).toHaveValue("supersecret");
  },
};

// Accessibility focused story
export const AccessibilityTest: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByLabelText(/email/i);
    const passwordInput = canvas.getByLabelText(/password/i);
    const loginButton = canvas.getByRole("button", { name: /login/i });

    // Check that the form can be navigated with keyboard
    await userEvent.tab();
    await expect(emailInput).toHaveFocus();

    await userEvent.tab();
    await expect(passwordInput).toHaveFocus();

    await userEvent.tab();
    await expect(loginButton).toHaveFocus();

    // Check ARIA labels and roles
    await expect(emailInput).toHaveAttribute("type", "email");
    await expect(passwordInput).toHaveAttribute("type", "password");
    await expect(loginButton).toHaveAttribute("type", "submit");
  },
};
