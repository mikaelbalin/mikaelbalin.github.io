import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules } from "@eslint/compat";
import storybook from "eslint-plugin-storybook";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default tseslint.config(
  ...tseslint.configs.recommended,
  ...storybook.configs["flat/recommended"],
  ...fixupConfigRules(compat.extends("next/core-web-vitals")),
  {
    ignores: [".next/*", "node_modules/*"],
    rules: {
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
);
