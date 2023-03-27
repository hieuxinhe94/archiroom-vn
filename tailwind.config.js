/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
    './public/index.html',
    './Components/**/*.js',
    './pages/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  important: true,
}