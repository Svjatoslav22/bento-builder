import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/widgets/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090B",
        surface: "#121214",
        surfaceElevated: "#1A1A1D",
        border: "#27272A",
        borderHover: "#3F3F46",
        textPrimary: "#FAFAFA",
        textSecondary: "#A1A1AA",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      keyframes: {
        blink: {
          "50%": { opacity: "0" },
        },
        "pulse-bar": {
          "0%, 100%": { height: "100%" },
          "50%": { height: "30%" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translate(-50%, 8px)" },
          to: { opacity: "1", transform: "translate(-50%, 0)" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "pulse-bar": "pulse-bar 1s ease-in-out infinite",
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
};

export default config;
