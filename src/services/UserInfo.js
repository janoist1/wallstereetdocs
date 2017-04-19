const request = require('request')
const userProfiles = new Map()
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
}

/**
 * Get profile
 * - get from cache or
 * - get from the api and store it in memory cache
 *
 * @param token
 * @returns {*}
 */
function getProfile (token) {
  if (userProfiles.has(token)) {
    logger('Returning user profile from cache')

    return Promise.resolve(userProfiles.get(token))
  }

  return obtainProfile(token)
    .then(profile => {
      logger('Returning user profile from api')

      userProfiles.set(token, profile)

      return profile
    })
}

/**
 * Ask user service for user profile
 *
 * @param token
 * @returns {Promise}
 */
function obtainProfile (token) {
  if (!config.url) {
    throw Error('UserInfo requires setup')
  }

  const options = {
    url: config.url,
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }

  return new Promise(resolve => {
    request(options, (error, response, body) => {
      if (error) {
        throw Error(error)
      }
      if (response.statusCode !== 200) {

      }

      resolve(JSON.parse(body))
    })
  })
}

module.exports = {
  getProfile,
  obtainProfile,
  setup,
}
