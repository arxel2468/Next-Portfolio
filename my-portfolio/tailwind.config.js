/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'primary-dark': '#0a1e2e',
        'primary-light': '#112d44',
        'primary-accent': '#1a3b57',
        'text-primary': '#e0e6ed',
        'text-secondary': '#c4ccd6',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, #0a1e2e 0%, #1a3b57 100%)',
        'footer-gradient': 'linear-gradient(90deg, #0a1e2e 0%, #1a3b57 100%)',
      },
      animation: {
      slideInLeft: 'slideInLeft 1s ease-in-out',
      fadeIn: 'fadeIn 1.5s ease-in-out',
      },
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
