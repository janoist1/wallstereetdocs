const dbOptions = require('./database.json') // single source of truth

module.exports = {
  // ======================================================
  // Overrides when NODE_ENV === 'development'
  // ======================================================
  development : config => ({
    database: {
      uri: 'sqlite://database.prod.sqlite',
      options: {
        logging: config.database.options.logging,
        storage: dbOptions.development.storage,
        dialect: dbOptions.development.dialect,
      }
    },
  }),

  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // ======================================================
  production : config => ({

    // sample override of giphy api settings
    giphy: {
      apiKey: config.giphy.apiKey, // this should be replaced by the prod key
      https: true,
      timeout: 30*60,
    },

    database: {
      uri: 'sqlite://database.prod.sqlite',
      options: {
        logging: config.database.options.logging,
        storage: dbOptions.production.storage,
        dialect: dbOptions.production.dialect,
      }
    },
  })
}
