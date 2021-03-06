const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const postCSSModulesValues = require('postcss-modules-values')
const path = require('path')
const webpack = require('webpack')

const outputPath = path.resolve(__dirname, 'dist')
const isDevelopment = process.env.NODE_ENV !== 'production'
const localIdentName = isDevelopment ? '[path][local]-[hash:base64:5]' : '[hash:base64:5]'
const extractCss = new ExtractTextPlugin('[name]-[hash].css')

const plugins = [
  extractCss,
  new HtmlWebpackPlugin({
    template: './src/index.html',
    inject: 'body',
    chunks: ['bundle']
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(isDevelopment ? 'development' : 'production')
    }
  }),
  new webpack.NoErrorsPlugin()
]

if (!isDevelopment) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      drop_debugger: false,
      warnings: false
    }
  }))
}

module.exports = {
  entry: {
    bundle: './src/index.js'
  },
  devtool: isDevelopment ? 'inline-source-map' : 'source-map',
  output: {
    path: outputPath,
    publicPath: '/',
    filename: isDevelopment ? '[name]-dev.js' : '[name].js'
  },
  devServer: {
    contentBase: outputPath,
    port: 9000
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          compact: false // enabling it breaks source-maps
        }
      },
      {
        test: /\.css$/,
        loader: extractCss.extract([
          'css?modules&importLoaders=1&localIdentName=' + localIdentName,
          'postcss'
        ])
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  babel: {
    babelrc: false,
    presets: ['sagui']
  },
  plugins: plugins,
  postcss: [
    postCSSModulesValues
  ],
  externals: {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window'
  }
}
