const dbOptions = require('./database.json') // single source of truth

module.exports = {
  // ======================================================
  // Overrides when NODE_ENV === 'development'
  // ======================================================
  development : config => ({
  }),

  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // ======================================================
  production : config => ({

    // replace with prod values

    auth: {
      oauth2_strategy_options: {
        authorizationURL: 'https://staging-auth.wallstreetdocs.com/oauth/authorize',
        tokenURL: 'https://staging-auth.wallstreetdocs.com/oauth/token',
        clientID: 'coding_test',
        clientSecret: 'bwZm5XC6HTlr3fcdzRnD',
        callbackURL: 'http://localhost:3000',
      },
      unauthenticated_url: '/login',
      error_url: '/error',
    },

    user_info: {
      url: 'https://staging-auth.wallstreetdocs.com/oauth/userinfo',
    }
  })
}
