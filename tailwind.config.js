/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["selector", '[data-mantine-color-scheme="dark"]'],
  theme: {
    screens: {
      xs: "36em",
      sm: "48em",
      md: "62em",
      lg: "75em",
      xl: "88em",
    },
    extend: {
      spacing: {
        15: "3.75rem",
      },
    },
  },
  plugins: [],
};
