/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      width: {
        108: "26rem",
        120: "30rem",
        130: "32rem",
        sHeart: "46rem",
        heart: "75rem",
      },
      height: {
        108: "26rem",
        120: "30rem",
        130: "32rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,
};
