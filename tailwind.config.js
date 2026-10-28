/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        charcoal: {
          50: '#f7f7f6',
          100: '#e6e5e3',
          200: '#cdcbc7',
          300: '#aaa6a0',
          400: '#86817a',
          500: '#6b6660',
          600: '#55514c',
          700: '#46423f',
          800: '#3b3835',
          900: '#1c1917',
          950: '#0c0a09',
        },
        ivory: {
          50: '#fefdfb',
          100: '#fdf9f3',
          200: '#faf3e6',
          300: '#f5e8d0',
          400: '#edd5ad',
          500: '#e4c08a',
        },
        gold: {
          50: '#fbf8f1',
          100: '#f5edd9',
          200: '#ead9b3',
          300: '#dbc085',
          400: '#c9a15a',
          500: '#a16207',
          600: '#8a5409',
          700: '#6f430c',
          800: '#5c370f',
          900: '#4e2f10',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-gold': '0 0 20px rgba(161, 98, 7, 0.3)',
        'card-3d': '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
