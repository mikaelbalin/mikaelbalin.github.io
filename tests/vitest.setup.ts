import { beforeAll, afterEach, vi } from "vitest";

beforeAll(() => {
  // Setup code that runs before all tests
  console.log("Setting up Playwright browser tests...");
});

afterEach(() => {
  // Cleanup after each test
  vi.clearAllMocks();
});
