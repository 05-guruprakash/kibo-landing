/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fredoka', 'sans-serif'],
        body: ['Quicksand', 'sans-serif'],
      },
      colors: {
        morning: {
          sky: '#fef3e2',
          pink: '#f9d5cc',
          gold: '#f4c896',
        },
        midday: {
          blue: '#a8d4e6',
          cream: '#fefae0',
        },
        afternoon: {
          green: '#d4e4bc',
          gold: '#f0d78c',
        },
        evening: {
          lavender: '#d4c4e0',
          rose: '#e8b4b8',
        },
        dusk: {
          purple: '#8b7ba0',
          blue: '#6a8caf',
        },
        night: {
          indigo: '#3a3a5c',
          blue: '#1a1a3e',
        },
        kibo: {
          cream: '#f5e6d3',
          blush: '#fcd5ce',
          shadow: '#e8d5c4',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'drift': 'drift 20s linear infinite',
        'firefly': 'firefly 4s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-10px) translateX(5px)' },
        },
        drift: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        firefly: {
          '0%, 100%': { opacity: '0', transform: 'translateY(0) scale(0.5)' },
          '10%': { opacity: '1' },
          '50%': { opacity: '0.8', transform: 'translateY(-30px) scale(1)' },
          '90%': { opacity: '0.2' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
};
