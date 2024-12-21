/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#cd6056',
        secondary: '#FF7F50',
      },
    },
  },
  plugins: [],
};
