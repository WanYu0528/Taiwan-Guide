/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}", "./index.html"],
  darkMode: "class",
  theme: {
    screens: {
      xxl: { max: "1780px" },
      xl: { max: "1560px" },
      lg: { max: "1360px" },
      pad: { max: "1024px" },
      mobile: { max: "767px" }
    },
    extend: {
      colors: {
        main: "#3fb195"
      }
    },
  },
  plugins: [],
};

