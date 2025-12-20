export default {
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        taskHeader: '#23272F',
        taskDescription: '#30343B'
      }
    },
  },
  plugins: [
    await import('@tailwindcss/typography').then(mod => mod.default)
  ],
}
