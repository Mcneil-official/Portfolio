/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './projects.html', './certificates.html', './layout.js', './main.js'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Sora', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Roboto Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      }
    }
  },
  plugins: []
};