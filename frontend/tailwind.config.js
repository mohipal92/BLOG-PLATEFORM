/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#0f0f0f",
          700: "#2d2d2d",
          500: "#5c5c5c",
          200: "#d4d4d4",
          50:  "#f7f7f7",
        },
        accent: {
          DEFAULT: "#e05c1a",
          light: "#f9e8df",
        },
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: ["'Segoe UI'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
