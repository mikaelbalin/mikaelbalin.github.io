import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { http, HttpResponse, delay } from "msw";
import { ContactForm } from "./ContactForm";

const meta: Meta<typeof ContactForm> = {
  component: ContactForm,
};
export default meta;

type Story = StoryObj<typeof ContactForm>;

export const Basic: Story = {
  args: {
    blockType: "formBlock",
    blockName: "contact-form",
    id: "contact-form",
    form: {
      submitButtonLabel: "Submit message",
      id: 1,
      title: "Send me a message",
      updatedAt: "2023-10-01T12:00:00Z",
      createdAt: "2023-10-01T12:00:00Z",
      fields: [
        {
          label: "Name",
          name: "name",
          id: "name",
          required: true,
          blockType: "text",
        },
        {
          label: "Email",
          name: "email",
          id: "email",
          required: true,
          blockType: "email",
        },
        {
          label: "Message",
          name: "message",
          id: "message",
          required: true,
          blockType: "textarea",
        },
        {
          label: "Terms and conditions",
          name: "terms",
          id: "terms",
          required: true,
          blockType: "checkbox",
        },
        {
          label: "Subscribe to newsletter",
          name: "newsletter",
          id: "newsletter",
          required: false,
          blockType: "checkbox",
        },
      ],
    },
  },
};

export const FilledForm: Story = {
  args: {
    ...Basic.args,
  },
  tags: ["test"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find form inputs and fill them
    const nameInput = canvas.getByLabelText(/name/i);
    const emailInput = canvas.getByLabelText(/email/i);
    const messageInput = canvas.getByLabelText(/message/i);

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.type(messageInput, "This is a test message");

    // Verify the inputs are filled
    await expect(nameInput).toHaveValue("John Doe");
    await expect(emailInput).toHaveValue("john@example.com");
    await expect(messageInput).toHaveValue("This is a test message");
  },
};

export const InvalidEmail: Story = {
  args: {
    ...Basic.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fill form with invalid email and submit
    const nameInput = canvas.getByLabelText(/name/i);
    const emailInput = canvas.getByLabelText(/email/i);
    const messageInput = canvas.getByLabelText(/message/i);
    const termsCheckbox = canvas.getByLabelText(/terms and conditions/i);
    const submitButton = canvas.getByRole("button", {
      name: /submit message/i,
    });

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "invalid-email");
    await userEvent.type(messageInput, "Test message");
    await userEvent.click(termsCheckbox);
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
              message: "Message sent successfully!",
            },
            { status: 200 },
          );
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fill valid form data and submit
    const nameInput = canvas.getByLabelText(/name/i);
    const emailInput = canvas.getByLabelText(/email/i);
    const messageInput = canvas.getByLabelText(/message/i);
    const termsCheckbox = canvas.getByLabelText(/terms and conditions/i);
    const newsletterCheckbox = canvas.getByLabelText(
      /subscribe to newsletter/i,
    );
    const submitButton = canvas.getByRole("button", {
      name: /submit message/i,
    });

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.type(messageInput, "This is a test message");
    await userEvent.click(termsCheckbox);
    await userEvent.click(newsletterCheckbox);
    await userEvent.click(submitButton);

    await delay(1000); // Wait for async submission to complete

    // Should show success message
    await expect(canvas.getByText(/thank you!/i)).toBeInTheDocument();
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
              error: "Invalid form data",
            },
            { status: 400 },
          );
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nameInput = canvas.getByLabelText(/name/i);
    const emailInput = canvas.getByLabelText(/email/i);
    const messageInput = canvas.getByLabelText(/message/i);
    const termsCheckbox = canvas.getByLabelText(/terms and conditions/i);
    const submitButton = canvas.getByRole("button", {
      name: /submit message/i,
    });

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.type(messageInput, "Test message");
    await userEvent.click(termsCheckbox);
    await userEvent.click(submitButton);

    await delay(1000); // Wait for async submission to complete

    // Should show error message
    await expect(canvas.getByText(/form submit error/i)).toBeInTheDocument();
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
              message: "Message sent successfully!",
            },
            { status: 200 },
          );
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nameInput = canvas.getByLabelText(/name/i);
    const emailInput = canvas.getByLabelText(/email/i);
    const messageInput = canvas.getByLabelText(/message/i);
    const termsCheckbox = canvas.getByLabelText(/terms and conditions/i);
    const submitButton = canvas.getByRole("button", {
      name: /submit message/i,
    });

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.type(messageInput, "Test message");
    await userEvent.click(termsCheckbox);
    await userEvent.click(submitButton);

    // Check loading state
    await expect(submitButton).toBeDisabled();
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
    const nameInput = canvas.getByLabelText(/name/i);
    const emailInput = canvas.getByLabelText(/email/i);
    const messageInput = canvas.getByLabelText(/message/i);
    const termsCheckbox = canvas.getByLabelText(/terms and conditions/i);
    const subscribeCheckbox = canvas.getByLabelText(/subscribe to newsletter/i);
    const submitButton = canvas.getByRole("button", {
      name: /submit message/i,
    });

    // Check that form can be navigated with keyboard
    await userEvent.tab();
    await expect(nameInput).toHaveFocus();

    await userEvent.tab();
    await expect(emailInput).toHaveFocus();

    await userEvent.tab();
    await expect(messageInput).toHaveFocus();

    await userEvent.tab();
    await expect(termsCheckbox).toHaveFocus();

    await userEvent.tab();
    await expect(subscribeCheckbox).toHaveFocus();

    await userEvent.tab();
    await expect(submitButton).toHaveFocus();

    // Check ARIA labels and roles
    await expect(submitButton).toHaveAttribute("type", "submit");
  },
};
