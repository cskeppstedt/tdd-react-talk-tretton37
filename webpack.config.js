const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const postCSSModulesValues = require('postcss-modules-values')
const path = require('path')
const webpack = require('webpack')

const outputPath = path.resolve(__dirname, 'dist')
const isDevelopment = process.env.NODE_ENV === 'development'
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
  })
]

if (!isDevelopment) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }))
}

module.exports = {
  entry: {
    bundle: './src/index.js'
  },
  devtool: 'inline-source-map',
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
    // preLoaders: [
    //   {
    //     test: /\.js$/,
    //     loader: 'eslint-loader',
    //     exclude: /node_modules/
    //   }
    // ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: extractCss.extract([
          'css?modules&importLoaders=1&localIdentName=' + localIdentName,
          'postcss'
        ])
      }
    ]
  },
  plugins: plugins,
  postcss: [
    postCSSModulesValues
  ],
  // eslint: {
  //   configFile: path.join(__dirname, '.eslintrc')
  // },
  externals: {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window'
  }
}
