/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'node-bg': '#1e1e2e',
        'node-border': '#313244',
        'node-header': '#45475a',
        'accent': '#89b4fa',
        'accent-green': '#a6e3a1',
        'accent-red': '#f38ba8',
        'accent-yellow': '#f9e2af',
        'accent-purple': '#cba6f7',
        'accent-orange': '#fab387',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
