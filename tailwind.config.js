/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        daccent: {
          base: '#3b3abe',
          faint: '#14145d',
          subtle: '#1e1e80',
          muted: '#2a2aa2',
          emphasis: '#5d5cde',
          bold: '#b4b4fd'
        },
        laccent: {
          base: '#5d5cde',
          faint: '#ebecff',
          subtle: '#d2d2fe',
          muted: '#7878f2',
          emphasis: '#3b3abe',
          bold: '#1e1e80'
        },
        dark: {
          base: '#181818',
          faint: '#242424',
          subtitle: '#313535',
          muted: '#464e4e',
          emphasis: '#5d6565'
        },
        light: {
          base: '#fff',
          faint: '#f7f7f7',
          subtitle: '#f1f2f2',
          muted: '#e4e7e7',
          emphasis: '#a5acac'
        }
      }
    }
  },
  plugins: []
}
