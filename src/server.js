const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const hbs = require('express-hbs')
const MemoryStore = require('session-memory-store')(session)
const debug = require('debug')
const config = require('../config')
const loadHelpers = require('./helpers')
const authenticationService = require('./services/Authentication')
const userInfoService = require('./services/UserInfo')
const mainController = require('./controllers/Main')
const userController = require('./controllers/User')

loadHelpers(hbs)
authenticationService.setup(config.auth, debug('app:authentication'))
userInfoService.setup(config.user_info, debug('app:userInfo'))

module.exports = () => {
  const app = express()

  app
    .engine('hbs', hbs.express4({
      partialsDir: config.paths.partials(),
    }))
    .set('view engine', 'hbs')
    .set('views', config.paths.views())
    .use(express.static(config.paths.public()))
    .use(cookieParser())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
      extended: true,
    }))
    .use(session({
      secret: 'cookie_secret',
      name: 'very_secure_stuff',
      store: new MemoryStore(),
      proxy: true,
      resave: true,
      saveUninitialized: true,
    }))
    .use(authenticationService.passport.initialize())
    .use(authenticationService.passport.session())
    .use(handleError)
    .get('/', authenticationService.handleAuthentication, mainController.index)
    .get('/dashboard', authenticationService.ensureAuthenticated, mainController.dashboard)
    .get('/profile', authenticationService.ensureAuthenticated, userController.profile)
    .get('/error', mainController.error)
    .get('/login', userController.login)
    .get('/logout', userController.logout)
    .get('/authenticate', authenticationService.authenticate)

  return app
}

/**
 * Redirects to the error page if error occured
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function handleError (req, res, next) {
  if (req.user && req.user.error) {
    // req.logout()
    return mainController.error(req, res, next)
  }

  return next()
}
