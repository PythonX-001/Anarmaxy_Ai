const { postcss } = require('tailwindcss');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/*.html", "./static/js/*.js"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      //* Colors
      colors: {
        textDim: "var(--textDim)",
        border: "var(--border)",
        text: "var(--text)",
        background: {
          50: "var(--background-50)",
          100: "var(--background-100)",
          300: "var(--background-200)",
          200: "var(--background-300)",
          400: "var(--background-400)",
          500: "var(--background-500)",
          600: "var(--background-600)",
          700: "var(--background-700)",
          800: "var(--background-800)",
          900: "var(--background-900)",
          950: "var(--background-950)",
          default: "var(--background)",
        },
        primary: {
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
          950: "var(--primary-950)",
          default: "var(--primary)",
        },
      },
      //*

      borderRadius: {
        main: "6px",
      },
      fontSize: {
        xxs: "10px",
      },
      fontFamily: {
        inter: "'Inter', sans-serif",
        space: "'Space Mono', monospace",
        azeret: "'Azeret Mono', monospace",
      },
    },
  },
  plugins: [],
};
