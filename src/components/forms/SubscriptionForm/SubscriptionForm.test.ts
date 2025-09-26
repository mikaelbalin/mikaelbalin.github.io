import { expect, test } from "vitest";
import { composeStories } from "@storybook/nextjs-vite";
import * as stories from "./SubscriptionForm.stories";

// Compose all stories from the stories file
const { Basic } = composeStories(stories);

// These tests run in Playwright browser environment via Storybook
test("Basic story renders correctly", async () => {
  // Renders the composed story
  await Basic.run();

  // Test that the basic story renders without errors
  expect(Basic).toBeDefined();
});
