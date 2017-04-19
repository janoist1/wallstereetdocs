const debug = require('debug')('app:server:controllers:user')

module.exports.profile = function (req, res) {
  debug(`${req.originalUrl}`)

  const profile = mapProfile(req.user)

  res.render('partials/user/profile', {
    layout: req.xhr ? undefined : 'layouts/default', // send no layout when AJAX
    profile: profile,
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

function mapProfile (user) {
  const profile = {}

  Object
    .keys(user)
    .forEach(key => {
      let value = user[key]

      switch (key) {
        case 'emails':
          value = value.map(item => item.value)
          break

        case 'name':
          value = Object.values(value).join(' ')
          break
      }

      profile[key] = value
    })

  return profile
}
