const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin');

const path = require('path')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  devtool: 'source-map',
  entry: ['babel-polyfill', './src/js/index.js'],
  output: {
    filename: 'public/js/[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  devServer: {
    compress: true,
    port: 9000,
    historyApiFallback: true
  },
  resolve: {
    alias: {
      imagesPath: path.resolve(__dirname, 'images/')
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader', options: { minimize: true } }]
      },
      {
        test: /\.(png|jpe?g|gif)/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[path][name].[ext]?[hash]',
              limit: 10000,
              fallback: 'file-loader',
              useRelativePath: true,
              outputPath: 'public/',
              publicPath: '../'
            }
          }
        ]
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]?[hash]',
              useRelativePath: true,
              outputPath: 'public/',
              publicPath: '../'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /fonts\/.{1,}\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'public/fonts/',
            publicPath: '../fonts/'
          }
        }]
      },
      {
        test: /\.(mp3|ogg)$/i,
        use: [
          {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'public/audio/'
          }
        }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? 'public/css/[name].css' : 'public/css/[name].[hash].css',
      chunkFilename: devMode ? 'public/css/[id].css' : 'public/css/[id].[hash].css'
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
}
