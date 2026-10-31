```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#A855F7",   // Neon Purple
        secondary: "#C084FC", // Light Purple
        accent: "#22D3EE",    // Neon Cyan
        darkBg: "#08050F",    // Main Dark Background
        cardBg: "#120A20",    // Dark Purple Cards
      },
    },
  },
  plugins: [],
};
```