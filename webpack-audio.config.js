require('babel-polyfill')

const path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: ['babel-polyfill', './src/js/tasks/generate-names-src.js'],
  output: {
    filename: './src/js/tasks/generate-names.js',
    path: path.resolve(__dirname, './')
  },
  resolve: {
    alias: {
      imagesPath: path.resolve(__dirname, 'images/')
    }
  },
  module: {
    rules: [
      {
        test: /\.svg$/i,
        use: [{ loader: 'url-loader' }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
