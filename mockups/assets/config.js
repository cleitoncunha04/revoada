// Tema da Revoada (herdado da paleta do BIRD: #154324, #87E174, #EEE5E9, #d9d9d9)
tailwind.config = {
  theme: {
    borderRadius: {
      none: '0',
      DEFAULT: '5px',
      sm: '5px',
      md: '5px',
      lg: '5px',
      xl: '5px',
      '2xl': '5px',
      full: '9999px',
    },
    extend: {
      colors: {
        revoada: {
          50: '#f1faee',
          100: '#dff5d8',
          200: '#bdeaae',
          300: '#87e174',
          400: '#5fc64d',
          500: '#3f9a5a',
          600: '#2a7442',
          700: '#1d5a31',
          800: '#154324',
          900: '#0d2a17',
        },
        gelo: '#EEE5E9',
        nevoa: '#d9d9d9',
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
};
