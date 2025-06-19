module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        gold: '#D4AF37',
        lightGold: '#F5E7A1',
        darkGold: '#B8860B',
        charcoal: '#1A1A1A',
        white: '#FFFFFF',
        kenya: '#006600',
        uganda: '#FFCC00'
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        poppins: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}