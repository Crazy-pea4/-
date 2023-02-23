/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/App.vue",
    "./src/views/**/*.{vue,js,ts,jsx,tsx}",
    "./src/components/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      width: {
        108: "26rem",
        120: "30rem",
        130: "32rem",
        sHeart: "46rem",
        mHeart: "54rem",
        heart: "75rem",
      },
      height: {
        108: "26rem",
        120: "30rem",
        130: "32rem",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,
};
