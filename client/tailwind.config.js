import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        "dm-sans": ["DM Sans", "sans-serif"],
        "dm-display": ["DM Serif Display", "serif"],
      },
      colors: {
        primary: "#222222",
        line: "#5E5E5E",
      },
    },
  },
  plugins: [],
};

export default withMT(config);
