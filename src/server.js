const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const hbs = require('express-hbs')
const MemoryStore = require('session-memory-store')(session)
const config = require('../config')
const authenticationService = require('./services/Authentication')
const userInfoService = require('./services/UserInfo')
const mainController = require('./controllers/Main')
const userController = require('./controllers/User')

authenticationService.setup(config.auth)
userInfoService.setup(config.user_info)

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
    .get('/', authenticationService.handleAuthentication, mainController.index)
    .get('/dashboard', authenticationService.ensureAuthenticated, mainController.dashboard)
    .get('/profile', authenticationService.ensureAuthenticated, userController.profile)
    .get('/login', userController.login)
    .get('/logout', userController.logout)
    .get('/authenticate', authenticationService.authenticate)
    // .get('/:queryText', giphinateHandler.get)
    // .delete('/:queryText', giphinateHandler.delete)

  return app
}
