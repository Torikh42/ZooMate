/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,tsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'yellow-light': '#fff7e3',
        'yellow-normal': '#fff5b5',
        'yellow-dark': '#b8b868',
        'yellow-darker': '#595630',
        'green-soft': '#bbf7d0',
        'blue-soft': '#bfdbfe',
        'pale-yellow': '#fef9c3',
        'dark-brown': '#3e3518',
      },
      borderRadius: {
        '3xl': '24px',
      },
      spacing: {
        '18': '72px',
      }
    },
  },
  plugins: [],
}