/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["selector", '[data-mantine-color-scheme="dark"]'],
  theme: {
    extend: {
      spacing: {
        15: "3.75rem",
      },
    },
  },
  plugins: [],
};
