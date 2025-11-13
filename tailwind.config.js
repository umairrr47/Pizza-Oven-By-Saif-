/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "off-white": "var(--off-white)", // ✅ your CSS variable
      },
      fontFamily: {
        // Normal text
        neuehaas: ['"Neue Haas Grotesk Display Pro"', 'sans-serif'],
      helvetica: ['"Helvetica Now Display"', 'sans-serif'],
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
