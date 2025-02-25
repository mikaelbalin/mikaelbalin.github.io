import type { Config } from "tailwindcss";
import { screens } from "./src/theme/screens";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["selector", '[data-mantine-color-scheme="dark"]'],
  theme: {
    colors: {
      black: "var(--mantine-color-black)",
      white: "var(--mantine-color-white)",
      appLightColorGreyDark: "var(--app-color-grey-dark)",
      appDarkColorGreyLight: "var(--app-color-grey-light)",
      appLightColorBeige: "var(--app-color-beige)",
      appLightColorGrey: "var(--app-color-grey)",
      appLightColorBeigeDark: "var(--app-color-beige-dark)",
      appDarkColorCoalBlack: "var(--app-color-coal-black)",
      appDarkColorCoalBlackLight: "var(--app-color-coal-black-light)",
    },
    screens,
    fontSize: {
      sm: ["0.875rem", "1.085rem"],
      base: ["1rem", "1.24rem"],
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": ["1.5rem", "1.875rem"],
      "3xl": "1.75rem",
      "3.5xl": "1.875rem",
      "4xl": ["2rem", "2.48rem"],
      "4.5xl": "2.5rem",
      "5xl": ["2.125rem", "2.5075rem"],
      "6xl": ["3rem", "3.54rem"],
      "7xl": ["5rem", "5.9rem"],
      "8xl": ["5.5rem", "6.49rem"],
      "9xl": ["6.5rem", "7.67rem"],
      "10xl": ["13.5rem", "normal"],
    },
    extend: {
      spacing: {
        "13": "3.25rem",
        "15": "3.75rem",
        "18": "4.5rem",
        "26": "6.5rem",
        "33": "8.25rem",
        "34": "8.5rem",
        "50": "12.5rem",
        "6.5": "1.5625rem",
        "13.5": "3.375rem",
        "15.5": "3.875rem",
        "19.5": "4.875rem",
      },
      lineHeight: {
        "11": "1.085rem",
        "12": "1.24rem",
        "13": "1.395rem",
        "14": "1.375rem",
        "15": "1.55rem",
        "16": "1.875rem",
        "17": "2.065rem",
        "18": "2.17rem",
        "19": "2.48rem",
        "20": "2.5075rem",
        "21": "3.54rem",
        "22": "5.9rem",
        "23": "6.49rem",
        "24": "7.67rem",
        normal: "normal",
      },
      keyframes: {
        scroll: {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(calc(-100% - var(--gap)))",
          },
        },
        slideDown: {
          from: {
            transform: "translateY(-100%)",
          },
          to: {
            transform: "translateY(0)",
          },
        },
        fadeIn: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
      },
      animation: {
        scroll: "scroll 30s linear infinite",
        slideDown: "slideDown 1s ease-out",
        fadeInDelay300: "fadeIn 1s ease-out 0.3s both",
        fadeInDelay500: "fadeIn 1s ease-out 0.5s both",
        fadeInDelay700: "fadeIn 1s ease-out 0.7s both",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
