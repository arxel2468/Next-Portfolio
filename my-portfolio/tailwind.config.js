/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body:    ['var(--font-garamond)', 'Georgia', 'serif'],
        mono:    ['var(--font-jetbrains)', 'monospace'],
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        paper:  '#F2EDE4',
        ink:    '#0D0C0A',
        red:    '#C8392B',
        brass:  '#B8934A',
      },
    },
  },
  plugins: [],
};