/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        accent: {
          primary: '#4f46e5',   // indigo-600
          primarySoft: '#6366f1', // indigo-500
          primaryMuted: '#818cf8', // indigo-400

          secondary: '#f97316', // orange-500
          secondarySoft: '#fb923c', // orange-400
          secondaryMuted: '#fed7aa', // orange-200
        },
      },
      boxShadow: {
        accent: '0 0 0 1px rgba(79,70,229,0.4)',
        accentGlow: '0 0 18px rgba(79,70,229,0.35)',
        accentHover: '0 0 24px rgba(249,115,22,0.45)',
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Inter',
          'Roboto',
          'Arial',
          'Noto Sans',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      letterSpacing: {
        tightish: '-0.02em',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.neutral.300'),
            a: {
              color: theme('colors.accent.primary'),
              textUnderlineOffset: '4px',
            },
            h1: {
              color: theme('colors.neutral.100'),
              letterSpacing: theme('letterSpacing.tightish'),
            },
            h2: {
              color: theme('colors.neutral.100'),
              letterSpacing: theme('letterSpacing.tightish'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'class',
}
