/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Normal text
        sans: [
          'Figtree',
          'ui-sans-serif','system-ui','-apple-system','Segoe UI',
          'Roboto','Helvetica Neue','Arial','Noto Sans','sans-serif'
        ],
        // Headings
        heading: [
          'Roboto',
          'Figtree',
          'ui-sans-serif','system-ui','Segoe UI',
          'Helvetica Neue','Arial','Noto Sans','sans-serif'
        ],
      },
    },
  },
  plugins: [],
};
