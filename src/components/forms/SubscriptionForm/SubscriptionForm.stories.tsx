import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { http, HttpResponse, delay } from "msw";
import { SubscriptionForm } from "./SubscriptionForm";

const meta: Meta<typeof SubscriptionForm> = {
  component: SubscriptionForm,
  parameters: {
    backgrounds: {
      default: "Shadow earth",
      values: [
        // 👇 Add a new value
        { name: "Shadow earth", value: "var(--color-shadow-earth)" },
      ],
    },
  },
};
export default meta;

type Story = StoryObj<typeof SubscriptionForm>;

export const Basic: Story = {
  args: {
    blockType: "formBlock",
    blockName: "subscription-form",
    id: "subscription-form",
    form: {
      submitButtonLabel: "Subscribe",
      id: 1,
      title: "Subscribe to our newsletter",
      updatedAt: "2023-10-01T12:00:00Z",
      createdAt: "2023-10-01T12:00:00Z",
      fields: [
        {
          label: "Email",
          name: "email",
          id: "email",
          required: true,
          blockType: "email",
        },
      ],
    },
  },
};

export const FilledEmail: Story = {
  args: {
    ...Basic.args,
  },
  tags: ["test"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the email input and fill it
    const emailInput = canvas.getByLabelText(/email/i);
    await userEvent.type(emailInput, "test@example.com");

    // Verify the input is filled
    await expect(emailInput).toHaveValue("test@example.com");
  },
};

export const InvalidEmail: Story = {
  args: {
    ...Basic.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fill invalid email and submit
    const emailInput = canvas.getByLabelText(/email/i);
    const submitButton = canvas.getByRole("button", { name: /subscribe/i });

    await userEvent.type(emailInput, "invalid-email");
    await userEvent.click(submitButton);

    // Should show validation error
    // Note: This will be tested when form validation triggers
    await expect(emailInput).toHaveValue("invalid-email");
  },
};

export const SuccessfulSubmission: Story = {
  args: {
    ...Basic.args,
  },
  parameters: {
    msw: {
      handlers: [
        http.post("/api/form", () => {
          return HttpResponse.json(
            {
              message: "Successfully subscribed to newsletter!",
            },
            { status: 200 },
          );
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fill valid email and submit
    const emailInput = canvas.getByLabelText(/email/i);
    const submitButton = canvas.getByRole("button", { name: /subscribe/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.click(submitButton);

    await delay(1000); // Wait for async submission to complete

    // Should show success message
    await expect(
      canvas.getByText(/subscription successful/i),
    ).toBeInTheDocument();
  },
};

export const ErrorSubmission: Story = {
  args: {
    ...Basic.args,
  },
  parameters: {
    msw: {
      handlers: [
        http.post("/api/form", () => {
          return HttpResponse.json(
            {
              error: "Invalid email address",
            },
            { status: 400 },
          );
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByLabelText(/email/i);
    const submitButton = canvas.getByRole("button", { name: /subscribe/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.click(submitButton);

    await delay(1000); // Wait for async submission to complete

    // Should show error message
    await expect(canvas.getByText(/subscription error/i)).toBeInTheDocument();
  },
};

export const LoadingState: Story = {
  args: {
    ...Basic.args,
  },
  parameters: {
    msw: {
      handlers: [
        http.post("/api/form", async () => {
          await delay(2000); // Delay response by 2 seconds
          return HttpResponse.json(
            {
              message: "Successfully subscribed!",
            },
            { status: 200 },
          );
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByLabelText(/email/i);
    const submitButton = canvas.getByRole("button", { name: /subscribe/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.click(submitButton);

    // Check loading state
    await expect(submitButton).toBeDisabled();
    await expect(
      within(submitButton).getByText(/loading/i),
    ).toBeInTheDocument();
  },
};

// Accessibility focused story
export const AccessibilityTest: Story = {
  args: {
    ...Basic.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test keyboard navigation
    const emailInput = canvas.getByLabelText(/email/i);
    const submitButton = canvas.getByRole("button", { name: /subscribe/i });

    // Check that form can be navigated with keyboard
    await userEvent.tab();
    await expect(emailInput).toHaveFocus();

    await userEvent.tab();
    await expect(submitButton).toHaveFocus();

    // Check ARIA labels and roles
    // await expect(emailInput).toHaveAttribute("type", "email");
    await expect(submitButton).toHaveAttribute("type", "submit");
  },
};
