// @ts-check

import { fileURLToPath } from "node:url";
import { globalIgnores } from "eslint/config";
import storybook from "eslint-plugin-storybook";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const __filename = fileURLToPath(import.meta.url);

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  ...storybook.configs["flat/recommended"],
  globalIgnores([
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/config/migrations/*",
    "coverage/**",
    "public/mockServiceWorker.js",
  ]),
  {
    rules: {
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: false,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^(_|ignore)",
        },
      ],
    },
  },
];

export default eslintConfig;
