import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#101216",
          card: "#181C22",
          border: "#30343B",
          text: "#F1F1F1",
          muted: "#A5A9B0",
        },
        brand: {
          amber: "#E5A93B",
          cyan: "#75B8C9",
          red: "#EF4444",
        },
      },
    },
  },
  plugins: [],
};

export default config;
