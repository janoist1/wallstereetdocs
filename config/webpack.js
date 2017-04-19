const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('./index')

module.exports = {
  entry: config.paths.client(),

  output: {
    filename: 'appBundle.js', // '[name].[chunkhash].js'
    path: config.paths.public(),
  },

  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: 'css-loader',
      }),
    }],
  },

  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
      jquery: 'bootstrap',
    }),
  ],
}
