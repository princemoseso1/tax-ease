/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A5C36", // dark green
        accent: "#FFD700",  // gold
      },
    },
  },
  plugins: [],
};
