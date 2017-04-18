const request = require('request')
const userProfiles = new Map()
let config = {}

/**
 * Setup service
 *
 * @param cfg
 */
function setup (cfg) {
  config = cfg
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
    return Promise.resolve(userProfiles.get(token))
  }

  return obtainProfile(token)
    .then(profile => {
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
