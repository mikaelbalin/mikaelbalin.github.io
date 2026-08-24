import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { SignupForm } from "./SignupForm";

const meta: Meta<typeof SignupForm> = {
  component: SignupForm,
};
export default meta;

type Story = StoryObj<typeof SignupForm>;

export const Basic: Story = {
  args: {},
};

export const FilledForm: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nameInput = canvas.getByLabelText(/full name/i);
    const emailInput = canvas.getByLabelText(/email/i);
    const passwordInput = canvas.getByLabelText(/^password$/i);
    const confirmPasswordInput = canvas.getByLabelText(/confirm password/i);

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.type(passwordInput, "supersecret");
    await userEvent.type(confirmPasswordInput, "supersecret");

    await expect(nameInput).toHaveValue("John Doe");
    await expect(emailInput).toHaveValue("john@example.com");
    await expect(passwordInput).toHaveValue("supersecret");
    await expect(confirmPasswordInput).toHaveValue("supersecret");
  },
};

// Accessibility focused story
export const AccessibilityTest: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nameInput = canvas.getByLabelText(/full name/i);
    const emailInput = canvas.getByLabelText(/email/i);
    const passwordInput = canvas.getByLabelText(/^password$/i);
    const confirmPasswordInput = canvas.getByLabelText(/confirm password/i);
    const submitButton = canvas.getByRole("button", {
      name: /create account/i,
    });

    // Check that the form can be navigated with keyboard
    await userEvent.tab();
    await expect(nameInput).toHaveFocus();

    await userEvent.tab();
    await expect(emailInput).toHaveFocus();

    await userEvent.tab();
    await expect(passwordInput).toHaveFocus();

    await userEvent.tab();
    await expect(confirmPasswordInput).toHaveFocus();

    await userEvent.tab();
    await expect(submitButton).toHaveFocus();

    // Check ARIA labels and roles
    await expect(emailInput).toHaveAttribute("type", "email");
    await expect(passwordInput).toHaveAttribute("type", "password");
    await expect(confirmPasswordInput).toHaveAttribute("type", "password");
    await expect(submitButton).toHaveAttribute("type", "submit");
  },
};
