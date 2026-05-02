/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F7F5F0',
        beige: '#EDEAE3',
        'beige-dark': '#E0DDD6',
        carbon: '#1C1C1A',
        stone: '#5C5A55',
        muted: '#9C9A95',
        pale: '#B0ADA6',
        card: '#FDFBF7',
        border: '#E8E4DC',
        rust: '#C84B0F',
        forest: '#2A6E3A',
        gold: '#D4C8A8',
        'map-bg': '#EAE6DC',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
