import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        redColor: "#ef4444",
        borderColor: 'rgb(75 85 99 / 0.5)',
        background: {
          main: "#161616",
          secondary: "#2E2E2E"
        },

        foreground: "var(--foreground)",
        primary: "#3b82f6"
      },
      keyframes: {
        "slide-in": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-out": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(100%)" },
        },
      },
      animation: {
        "slide-in": "slide-in 0.3s ease-out forwards",
        "slide-out": "slide-out 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
