/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5',
          dark: '#4338CA',
          light: '#6366F1',
        },
        neutral: {
          100: '#F9FAFB',
          200: '#F3F4F6',
          300: '#E5E7EB',
          400: '#D1D5DB',
          500: '#9CA3AF',
          600: '#6B7280',
          700: '#4B5563',
          800: '#374151',
          900: '#1F2937',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['SF Mono', 'Roboto Mono', 'monospace'],
      },
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
} 