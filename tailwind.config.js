module.exports = {
//   content: ["./src/**/*.{html,js}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],

content: ['./public/*.*',
'./src/*.*',
'./src/**/*.*',
'./index.html'],
theme: {
  extend: {
    colors: {
      plata: '#f2f2f2',
      suerte: '#37538C',
      billete: '#027373',
      moneda:'#5274D9',
    },
    transitionTimingFunction: {
      'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
      'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
    }
  },

},
plugins: [],
}