module.exports = {
  extends: ["next/core-web-vitals", "plugin:storybook/recommended"],
  plugins: ["@stylexjs"],
  rules: {
    "@stylexjs/valid-styles": "error",
  },
};
