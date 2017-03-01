const webpack = require('webpack')

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "src/js/app-src.js.js",
  output: {
    path: __dirname + "/public/js",
    filename: "bundle.min.js"
  }
}
