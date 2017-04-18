const debug = require('debug')('app:server:controllers:user')

module.exports.profile = function (req, res) {
  debug(`${req.originalUrl}`)

  res.render('partials/user/profile', {
    layout: req.xhr ? undefined : 'layouts/default', // send no layout when AJAX
  })
}

module.exports.login = function (req, res) {
  debug(`${req.originalUrl}`)

  res.render('partials/user/login', {
    layout: req.xhr ? undefined : 'layouts/default',
  })
}

module.exports.logout = function (req, res) {
  debug(`${req.originalUrl}`)

  req.logout()

  res.render('partials/user/logout', {
    layout: req.xhr ? undefined : 'layouts/default',
  })
}
