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
        serif: ['var(--font-playfair)', 'serif'],
        mono: ['var(--font-fira-code)', 'monospace'],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
        magazine: {
          paper: '#f8f9fa',
          ink: '#212529',
          muted: '#6c757d',
          accent: '#dc3545',
          light: '#e9ecef',
          dark: '#343a40',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'var(--tw-prose-body)',
            lineHeight: '1.75',
            a: {
              color: 'var(--tw-prose-links)',
              textDecoration: 'underline',
              fontWeight: '500',
            },
            h1: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '800',
              fontSize: '2.25em',
              marginTop: '0',
              marginBottom: '0.8888889em',
              lineHeight: '1.1111111',
            },
            h2: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '700',
              fontSize: '1.5em',
              marginTop: '2em',
              marginBottom: '1em',
              lineHeight: '1.3333333',
            },
            h3: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600',
              fontSize: '1.25em',
              marginTop: '1.6em',
              marginBottom: '0.6em',
              lineHeight: '1.6',
            },
            blockquote: {
              fontWeight: '500',
              fontStyle: 'italic',
              color: 'var(--tw-prose-quotes)',
              borderLeftWidth: '0.25rem',
              borderLeftColor: 'var(--tw-prose-quote-borders)',
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
              marginTop: '1.6em',
              marginBottom: '1.6em',
              paddingLeft: '1em',
            },
          },
        },
      },
      spacing: {
        '128': '32rem',
      },
      gridTemplateColumns: {
        'magazine': 'minmax(1.5rem, 1fr) repeat(12, minmax(0, 4rem)) minmax(1.5rem, 1fr)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};