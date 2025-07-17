/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        circuit: {
          primary: 'var(--circuit-primary)',
          secondary: 'var(--circuit-secondary)',
          accent: 'var(--circuit-accent)',
          bg: 'var(--circuit-bg)',
          surface: 'var(--circuit-surface)',
          text: 'var(--circuit-text)',
        },
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 240, 255, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 240, 255, 0.8)' },
        },
      },
    },
  },
  plugins: [],
};