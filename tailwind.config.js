/** @type {import('tailwindcss').Config} */

import { withUt } from "uploadthing/tw";
 
export default withUt({
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
});