/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f6fc',
          100: '#e1edf9',
          200: '#bcdcf3',
          300: '#82bee9',
          400: '#439dd9',
          500: '#1d7fc1',
          600: '#1265a0',
          700: '#0f5283',
          800: '#10466e',
          900: '#133c5d',
          950: '#0d263e',
        },
        accent: {
          50: '#f3fbf6',
          100: '#e3f7eb',
          200: '#c8efda',
          300: '#9bdfbc',
          400: '#67c696',
          500: '#41a975',
          600: '#2f8b5a',
          700: '#276f4a',
          800: '#22593d',
          900: '#1d4a34',
          950: '#0f291d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
