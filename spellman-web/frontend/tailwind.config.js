/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          300: '#86efac',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          900: '#14532d'
        },
        secondary: {
          blue: '#3b82f6',
          purple: '#a855f7',
          amber: '#f59e0b',
          cyan: '#06b6d4',
          pink: '#ec4899'
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          500: '#737373',
          900: '#171717'
        }
      }
    }
  },
  plugins: []
};
