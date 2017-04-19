const passport = require('passport')
const OAuth2Strategy = require('passport-oauth2')
const userInfo = require('./UserInfo')
let config = {}
let logger = console.log

/**
 * Setup service
 *
 * @param cfg
 * @param lgr
 */
function setup (cfg, lgr) {
  config = cfg
  logger = lgr

  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (obj, done) {
    done(null, obj)
  })

  passport.use(new OAuth2Strategy(
    Object.assign({}, config.oauth2_strategy_options, {passReqToCallback: true}),
    function (request, accessToken, refreshToken, profile, done) {
      logger('Got user access token: ' + accessToken)

      userInfo
        .getProfile(accessToken)
        .then(userProfile => {
          done(null, userProfile)
        })
        .catch(error => {
          done(null, {error})
        })
    }
  ))
}

/**
 * Redirects to the login page if not authenticated
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect(config.unauthenticated_url)
}

/**
 * Wrapper for passport auth stuff
 * - initiates authentication
 * - handles authentication
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function authenticate (req, res, next) {
  return passport.authenticate('oauth2', { failureRedirect: config.unauthenticated_url })(req, res, next)
}

/**
 * Since the `callbackURL` is pointing to our `/` url we need to make sure
 * - not to re-authenticate when the user hits the `/` page again
 * - pass handling onto the passport auth service when the user is redirected
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function handleAuthentication (req, res, next) {
  if (isAuthenticationInProgress(req)) {
    return authenticate(req, res, next)
  }

  return next()
}

/**
 * Return true if the code query param exists
 *
 * @param req
 * @returns {*}
 */
function isAuthenticationInProgress (req) {
  return req.query && req.query.code
}

module.exports = {
  authenticate,
  ensureAuthenticated,
  handleAuthentication,
  setup,
  passport,
}
