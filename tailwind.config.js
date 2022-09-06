module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        fade: 'fade ease-in-out 400ms  forwards',
        slide: 'slide ease-in-out 400ms  forwards',
        slideTop: 'slideTop ease-in-out 800ms  forwards',
        slideLeft: 'slideLeft ease-in-out 800ms  forwards',
      },
      keyframes: {
        fade: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slide: {
          from: { opacity: '0', transform: 'translateX(-10vw)' },
          to: { opacity: '1', transform: 'translateX(0vw)' },
        },
        slideTop: {
          from: { opacity: '0', transform: 'translateY(-100vw)' },
          to: { opacity: '1', transform: 'translateY(0vw)' },
        },
        slideLeft: {
          from: { opacity: '0', transform: 'translateX(-50vh)' },
          to: { opacity: '1', transform: 'translateX(0vh))' },
        },
      },
    },
  },
  plugins: [],
};
