/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        "dm-sans": ["DM Sans", "sans-serif"],
        "dm-display": ["DM Serif Display", "serif"],
      },
      colors: {
        primary: "#222222",
      },
    },
  },
  plugins: [],
};
