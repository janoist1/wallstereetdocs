const path = require('path')
const _debug = require('debug')
const debug = _debug('app:config:project')

debug('Creating default configuration.')

// ========================================================
// Default Configuration
// ========================================================
const config = {
  env: process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: path.resolve(__dirname, '..'),
  dir_src: 'src',
  dir_dist: 'dist',
  dir_public: 'public',
  dir_views: 'src/views',
  dir_partials: 'src/views/partials',
  dir_layouts: 'src/views/layouts',
  // dir_server: 'server',
  // dir_test: 'tests',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host: process.env.HOST || 'localhost',
  server_port: process.env.PORT || 3000,

  // ----------------------------------
  // Authentication Settings
  // ----------------------------------
  auth: {
    oauth2_strategy_options: {
      authorizationURL: 'https://staging-auth.wallstreetdocs.com/oauth/authorize',
      tokenURL: 'https://staging-auth.wallstreetdocs.com/oauth/token',
      clientID: 'coding_test',
      clientSecret: 'bwZm5XC6HTlr3fcdzRnD',
      callbackURL: 'http://localhost:3000',
    },
    unauthenticated_url: '/login', // can be `/authenticate` too to skip login page
  },

  // ----------------------------------
  // User Info Configuration
  // ----------------------------------
  user_info: {
    url: 'https://staging-auth.wallstreetdocs.com/oauth/userinfo',
  }
}

// ------------------------------------
// Utilities
// ------------------------------------
function base () {
  const args = [config.path_base].concat([].slice.call(arguments))
  return path.resolve.apply(path, args)
}

config.paths = {
  base: base,
  src: base.bind(null, config.dir_src),
  dist: base.bind(null, config.dir_dist),
  public: base.bind(null, config.dir_public),
  views: base.bind(null, config.dir_views),
  partials: base.bind(null, config.dir_partials),
  layouts: base.bind(null, config.dir_layouts)
}

// ========================================================
// Environment Configuration
// ========================================================
debug(`Looking for environment overrides for NODE_ENV "${config.env}".`)

let environments
try {
  environments = require('./environments')
} catch (err) {
  environments = {}
}

const overrides = environments[config.env]
if (overrides) {
  debug('Found overrides, applying to default configuration.')
  Object.assign(config, overrides(config))
} else {
  debug('No environment overrides found, defaults will be used.')
}

module.exports = config
