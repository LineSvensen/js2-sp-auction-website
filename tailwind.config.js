/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './pages/**/*.html',
    './src/**/*.{js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      colors: {
        Black: '#333333',
        White: '#FFFFFF',
        Red: {
          DEFAULT: '#ff2600',
          hover: '#ff5733',
        },
        Purple: {
          DEFAULT: '#6e35cc',
          hover: '#8e5edd',
        },
        Yellow: {
          DEFAULT: '#ffa100',
          hover: '#ffc233',
        },
        Grey: {
          DEFAULT: '#808080',
          hover: '#a0a0a0',
        },
        CTAGreen: {
          DEFAULT: '#82c01e',
          hover: '#a0d45a',
        },
        CTABlue: {
          DEFAULT: '#1f88fe',
          hover: '#4fa3ff',
        },
        CTARed: {
          DEFAULT: '#d61f2c',
          hover: '#f04d5a',
        },
      },
    },
  },
  plugins: [],
};
