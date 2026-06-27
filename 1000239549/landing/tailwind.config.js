/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        bg: '#090909',
        surface: '#111111',
        card: '#161616',
        'card-hover': '#1c1c1c',
        border: '#222222',
        'border-bright': '#333333',
        lime: '#c8ff00',
        'lime-dim': '#8fb300',
        cream: '#f0ede6',
        muted: '#555555',
        'muted-bright': '#888888',
      },
      animation: {
        'bob': 'bob 2s ease-in-out infinite',
        'walk': 'walk 12s linear infinite',
        'fadein': 'fadein 0.6s ease forwards',
        'fadein-up': 'fadeinUp 0.7s ease forwards',
        'blink': 'blink 1.2s step-end infinite',
      },
      keyframes: {
        bob: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        walk: {
          '0%': { transform: 'translateX(-80px)' },
          '100%': { transform: 'translateX(calc(100vw + 80px))' },
        },
        fadein: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeinUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
