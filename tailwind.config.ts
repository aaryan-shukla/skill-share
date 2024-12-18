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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Add Poppins font
        inter: ["Inter", "sans-serif"], // Optional: Inter font
        outfit: ["Outfit", "sans-serif"], // Optional: Outfit font
      },
    },
  },
  plugins: [],
} satisfies Config;
