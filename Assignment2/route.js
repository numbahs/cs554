const items = require('./items.json');

const constructorMethod = (app) => {
  app.get('/', function (req, res) {
    res.render('index', { 
      title: 'Frying Pans',
      lst: items,
      js: "/js/vendor.min.js",
      css: "/css/main.min.css"
    })
  })

  app.use('*', (req, res) => {
      res.status(404).render('404', {
        title: 'Frying Pans: 404',
        js: "/js/vendor.min.js",
        css: "/css/main.min.css"
      })
  })
}

module.exports = constructorMethod;