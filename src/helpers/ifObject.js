module.exports = function (hbs) {
  hbs.registerHelper('ifObject', function (item, options) {
    if (typeof item === 'object') {
      return options.fn(this)
    } else {
      return options.inverse(this)
    }
  })
}
