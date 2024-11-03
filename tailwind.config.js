/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'tablet': {'max': '639px'},
        // => @media (min-width: 640px) { ... }
  
        'laptop': {'min': '640px', 'max': '1200px'},
        // => @media (min-width: 1024px) { ... }
  
        'desktop': {'min': '1024px'},
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [],
}

