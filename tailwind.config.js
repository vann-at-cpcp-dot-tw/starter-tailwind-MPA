const purgecss = [
  './*.php',
  './**/*.php',
  './src/pages/*.js',
  './src/components/*.js',
]

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  target: [
    'ie11', {
      objectPosition: 'relaxed',
      objectFit: 'relaxed',
    }
  ],
  purge: process.env.NODE_ENV === 'production' ? purgecss :[],
  theme: {
    container: {
      center: true,
    },
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1400px',
      // '3xl': '1600px',
      // '4xl': '1920px',
    },
    extend: {
      spacing: {
        '5px': '5px',
        '8px': '8px',
        '10px': '10px',
        '20px': '20px',
        '30px': '30px',
        '40px': '40px',
      },
      fontSize: {
        '12px': '12px',
        '13px': '13px',
        '18px': '18px',
        '19px': '19px',
        '21px': '21px',
        '24px': '24px',
        '28px': '28px',
        '32px': '32px',
      },
      fontWeight: {
        '100': '100',
        '200': '200',
        '300': '300',
        '400': '400',
        '500': '500',
        '600': '600',
        '700': '700',
        '800': '800',
        '900': '900',
      },
      colors: {
        grey: {
          '100': '#d2d2d2',
          '300': '#888888',
          '500': '#444444',
          '700': '#242424',
          '900': '#0f0f0f',
        },
        main: {
          '100': '#f8cccc',
          '300': '#ea8282',
          '500': '#c93a3a',
          '700': '#782222',
          '900': '#3b1111',
        },
        secondary: {
          '100': '#d8e0f8',
          '300': '#a3b8f5',
          '500': '#5478e0',
          '700': '#1a3996',
          '900': '#0d2261',
        },
        success: '#64a168',
        warning: '#e6bc7c',
        error: '#d25b5b',
        description: '#68c4e9',
      }
    },
  },
  variants: {},
  plugins: [],
  corePlugins: {
    container: false,
    // outline: false,
    animation: false,
  },
}
