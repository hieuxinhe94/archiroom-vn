/** @type {import('tailwindcss').Config} */
import {nextui} from "@nextui-org/react";

const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
   
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      // Don't need xs since Tailwind uses min-width approach
      // to its media queries.
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px',
    },
    extend: {
      colors: {
        "primary": "#0C0053",
        gray: colors.neutral,
        "prinary-purple": "#0C0053",
        "purple-gd": "#FA00FF",
        "purple-plugin": "#78107a",
        "blue-gd": "#0094FF",
        "white-gray": "#8D8D8D",
        "light-black": "##222",
        "white01": "#FFFFFF19",
      },
      backgroundImage: {
        'blue-radial-gradient': 'radial-gradient(#040AA5 0%, #0C0053 50%)',
        'purple-radial-gradient': 'radial-gradient(#730067 0%, #0C0053 50%)',
      },
    }
  },
  plugins: [require("@tailwindcss/typography"), nextui() ]
}

