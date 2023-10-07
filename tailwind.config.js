/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        "background": "url('../app/_assets/images/background.jpg')"
      }
    }
  },
  darkMode: "class",
  plugins: [],
}