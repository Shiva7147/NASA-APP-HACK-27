/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        flame: {
          400: '#ff5522',
          500: '#ff3800',
          600: '#e62e00',
          700: '#c41e00',
          800: '#991500',
        },
        matte: {
          950: '#050507',
          900: '#0a0a0d',
          850: '#101116',
          800: '#16171f',
          700: '#22232e',
          600: '#343545',
          500: '#5c5e73',
          400: '#9193a8',
          300: '#c5c7d6',
          200: '#e3e4ee',
          100: '#f4f4f8',
        }
      },
      fontFamily: {
        doto: ['Doto', 'monospace'],
        space: ['Space Grotesk', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        sans: ['Plus Jakarta Sans', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        widestplus: '0.18em',
        tightplus: '-0.035em',
      }
    },
  },
  plugins: [],
}
