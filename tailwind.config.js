/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-blue': '#4A90E2',
        'game-blue-dark': '#357ABD',
      },
      fontFamily: {
        'game': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
