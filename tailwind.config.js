/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './pages/**/*.html',
    './src/**/*.{js,ts,jsx,tsx,html}',
  ],
  theme: {
    fontWeight: {
      regular: '400',
      medium: '500',
      bold: '600',
      display: '500',
    },
    fontSize: {
      xs: ['14px'],
      sm: ['16px'],
      base: ['16px'],
      lg: ['20px'],
      xl: ['24px'],
      '2xl': ['32px'],
      '3xl': ['36px'],
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    extend: {
      animation: {
        'fade-in': 'fadeIn 1.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
