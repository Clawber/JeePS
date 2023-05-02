/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{svelte,html,js,ts}'],
  theme: {
    extend: {
      colors:{
        'navbar-main-color': '#0c1219',
        'navbar-highlight-color': '#23303e',
      },
      spacing:{
        '13': '52px',
        '13.5': '54px',

      }
    },
  },
  plugins: [],
}

