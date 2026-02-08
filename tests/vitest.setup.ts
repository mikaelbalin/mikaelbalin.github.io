import { setProjectAnnotations } from "@storybook/nextjs-vite";
import { afterEach, beforeAll, vi } from "vitest";
import * as previewAnnotations from "../.storybook/preview";

const project = setProjectAnnotations([previewAnnotations]);

beforeAll(project.beforeAll);

afterEach(() => {
  // Cleanup after each test
  vi.clearAllMocks();
});
