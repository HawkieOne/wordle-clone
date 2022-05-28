module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'whiteBG': '#E5E9F0',
        'accent-dark': '#3B4252',
        'letter-dark': '#81A1C1',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}