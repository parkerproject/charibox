// assets to be used by the 'hapi-assets' module based on process.env.NODE_ENV
module.exports = {
  development: {
    js: ['js/responsive-nav.js'
    ],

    css: ['css/responsive-nav.css',
      'css/styles.css'
    ]
  },
  production: {
    js: ['js/scripts.min.js'],
    css: ['css/app.min.css']
  }
};