const helpers = require('handlebars-helper')
const ifObject = require('./ifObject')

module.exports = function (hbs) {
  helpers.help(hbs)
  ifObject(hbs)
}
