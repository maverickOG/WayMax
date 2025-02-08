/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Alexandria", "sans-serif"], // Set as default font
      },
    },
  },
  plugins: [],
};
