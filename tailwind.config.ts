import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      'green': '#1BD760',
      'evergreen': '#D5F479',
      'slate': '#181414',
      'blue': '#649AED',
      'red': '#EB5640',
      'babyPink': '#F7CFD4',
      'babyBlue': '#A7C2D1',
      'hotPink': '#E57BA1',
      'orange': '#F6C874',
      'yellow': '#F4E357',
      'white': '#FFFFFF',
      'transparent': 'transparent',
      'black': '#000000',
      'gray': {
        100: '#F5F5F5',
        200: '#EEEEEE',
        300: '#E0E0E0',
        400: '#BDBDBD',
        500: '#9E9E9E',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
      },
      
    },
    plugins: [],
  },
};
  export default config;
