// @ts-check

import { FlatCompat } from "@eslint/eslintrc";
import storybook from "eslint-plugin-storybook";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default tseslint.config(
  {
    ignores: [".next/*", "node_modules/*", "src/migrations/*"],
  },
  ...tseslint.configs.recommended,
  ...storybook.configs["flat/recommended"],
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
);
