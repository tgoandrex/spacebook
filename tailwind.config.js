/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        "dark": "url('../app/_assets/images/background-dark.jpg')"
      }
    }
  },
  darkMode: "class",
  plugins: [],
}