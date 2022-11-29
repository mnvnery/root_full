/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xxl: '1980px',
      },
      colors: {
        purple: '#7a68fb',
        pink: '#F19DC1', 
        red: '#F65029', 
        grey: '#B1B1B1',
        darkPurple: '#692D70',
        yellow: '#FFEEAE',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  safelist: [
    {
      pattern: /(bg|text|border)-(purple|red|pink|grey|darkPurple)/,
    },
  ],
}
