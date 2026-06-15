
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    display: ['var(--font-playfair)', 'Georgia', 'serif'],

      body: ['var(--font-garamond)', 'Georgia', 'serif'],

      sans: ['var(--font-inter)', 'Helvetica Neue', 'system-ui', 'sans-serif'],

      mono: ['var(--font-mono)', 'Fira Code', 'monospace'],
    },

    extend: {
      colors: {
        // Backgrounds — warm paper spectrum
        paper:    'var(--color-bg)',         // #F5F2EE — primary background
        surface:  'var(--color-surface)',    // #EFECE7 — card backgrounds
        'surface-hover': 'var(--color-surface-hover)', // interactive hover

        // Foreground — warm ink spectrum
        ink:      'var(--color-ink)',        // #1A1814 — primary text
        'ink-2':  'var(--color-ink-secondary)', // secondary text
        'ink-3':  'var(--color-ink-tertiary)',  // disabled / decorative

        // Rules — hairlines and dividers
        rule:     'var(--color-rule)',       // #D4CFC8 — hairline borders

        // The accent — ochre. Use sparingly.
        accent:   'var(--color-accent)',     // #C4922A — the one color
        'accent-subtle': 'var(--color-accent-subtle)', // accent fill
        'accent-dim':    'var(--color-accent-dim)',    // ghost fill for tags

        // Dark surface (Writing section, Footer)
        dark:     'var(--color-dark)',       // #141210
        'dark-2': 'var(--color-dark-2)',     // #1C1A17
      },

      spacing: {
        'sp-1':  'var(--sp-1)',   // 8px  — tight gaps
        'sp-2':  'var(--sp-2)',   // 11px — icon-text gaps
        'sp-3':  'var(--sp-3)',   // 14px — compact padding
        'sp-4':  'var(--sp-4)',   // 19px — standard padding
        'sp-5':  'var(--sp-5)',   // 25px — component separation
        'sp-6':  'var(--sp-6)',   // 33px — section internal gap
        'sp-7':  'var(--sp-7)',   // 44px — between subsections
        'sp-8':  'var(--sp-8)',   // 59px — major breaks
        'sp-9':  'var(--sp-9)',   // 78px — section padding
        'sp-10': 'var(--sp-10)', // 104px — max rhythm

        // Named semantic aliases — clearer intent in component code
        'section-x':  '3.75rem',  // 60px — horizontal section margin
        'nav-width':  '7.5rem',   // 120px — left rail width
        'content-pad': '3.5rem',  // 56px — right page margin
      },

      fontSize: {
        'micro':    ['0.625rem',   { lineHeight: '1.1' }],  // 10px  — eyebrow labels
        'caption':  ['0.8125rem',  { lineHeight: '1.5' }],  // 13px  — captions, dates
        'body':     ['1rem',       { lineHeight: '1.7' }],  // 16px  — body copy
        'lead':     ['1.125rem',   { lineHeight: '1.6' }],  // 18px  — lead paragraphs
        'sm-head':  ['1.25rem',    { lineHeight: '1.3' }],  // 20px  — small headings
        'md-head':  ['1.5625rem',  { lineHeight: '1.2' }],  // 25px  — medium headings
        'lg-head':  ['2rem',       { lineHeight: '1.15' }], // 32px  — section headings
        'disp-sm':  ['2.5rem',     { lineHeight: '1.1' }],  // 40px  — display small
        'disp-md':  ['3.125rem',   { lineHeight: '1.05' }], // 50px  — display medium
        'disp-lg':  ['3.9375rem',  { lineHeight: '1.0' }],  // 63px  — display large
      },

      letterSpacing: {
        'display': '-0.04em',  // Hero name — tightest
        'heading': '-0.02em',  // Section headings
        'normal':  '0em',      // Body copy
        'label':   '0.06em',   // UI labels
        'eyebrow': '0.12em',   // Small-caps section markers
      },

      // ─── BORDER RADIUS ─────────────────────────────────────────────────────
      borderRadius: {
        'sm': 'var(--radius-sm)',   // 4px
        'md': 'var(--radius-md)',   // 8px
        'lg': 'var(--radius-lg)',   // 16px
      },

      transitionTimingFunction: {
        'expo':   'cubic-bezier(0.76, 0, 0.24, 1)',   // primary reveals
        'out':    'cubic-bezier(0.16, 1, 0.3, 1)',     // interactive out
        'in':     'cubic-bezier(0.7, 0, 1, 0.5)',      // exit animations
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)', // magnetic effects
      },

      transitionDuration: {
        'instant': '80ms',
        'fast':    '200ms',
        'normal':  '400ms',
        'slow':    '700ms',
        'reveal':  '1200ms',
      },

      // ─── Z-INDEX STACK ─────────────────────────────────────────────────────
      zIndex: {
        'base':    '0',
        'above':   '10',
        'nav':     '100',
        'cursor':  '9000',
        'overlay': '9999',
      },

      // ─── GRID SYSTEM ───────────────────────────────────────────────────────
      gridTemplateColumns: {
        // The asymmetric 12-column editorial grid
        'layout': 'var(--nav-width) 1fr',
        // Two-column with deliberate asymmetry (content-heavy left)
        'editorial': '1.618fr 1fr', // Golden ratio split
        // Standard symmetric two-column
        'halves': '1fr 1fr',
        // Three-column with divider
        'contact': '1fr auto 1fr',
      },

      // ─── CUSTOM ANIMATIONS ──────────────────────────────────────────────────
      // CSS keyframe animations for elements that don't use Framer Motion
      keyframes: {
        // The pulsing dot in the topbar
        pulse: {
          '0%, 100%': { opacity: '1',   transform: 'scale(1)' },
          '50%':       { opacity: '0.3', transform: 'scale(0.75)' },
        },
        // The scroll-track runner
        run: {
          '0%':   { transform: 'translateX(-100%)', opacity: '0' },
          '15%':  { opacity: '1' },
          '85%':  { opacity: '1' },
          '100%': { transform: 'translateX(200%)', opacity: '0' },
        },
        // Nav rail fade in (delayed 2s after mount)
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse':   'pulse 2.2s ease-in-out infinite',
        'run':     'run 2.2s cubic-bezier(0.76,0,0.24,1) infinite',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
      },
    },
  },

  plugins: [],
};