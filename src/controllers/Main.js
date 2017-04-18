const debug = require('debug')('app:server:controllers:main')

module.exports.index = function (req, res) {
  debug(`${req.originalUrl}`)

  res.render('partials/main/index', {
    title: 'Welcome mate!',
    layout: req.xhr ? undefined : 'layouts/default',
  })
}

module.exports.dashboard = function (req, res) {
  debug(`${req.originalUrl}`)

  res.render('partials/main/dashboard', {
    title: 'Dashboard',
    layout: req.xhr ? undefined : 'layouts/default',
  })
}
