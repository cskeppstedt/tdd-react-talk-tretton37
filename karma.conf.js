const path = require('path')
const webpackConfig = require('./webpack.config.js')

module.exports = function (config) {
  config.set({
    port: 9001,
    frameworks: ['jasmine'],
    reporters: ['mocha'],
    files: [
      { pattern: './test-bundle.js', watched: false },
      { pattern: './src/**/*.js', watched: false, included: false }
    ],
    browsers: ['PhantomJS'],
    phantomjsLauncher: {
      exitOnResourceError: true
    },
    preprocessors: {
      './test-bundle.js': ['webpack', 'sourcemap']
    },
    webpack: {
      entry: './test-bundle.js',
      devtool: webpackConfig.devtool,
      module: {
        loaders: webpackConfig.module.loaders
      },
      plugins: webpackConfig.plugins,
      postcss: webpackConfig.postcss,
      externals: webpackConfig.externals
    },
    webpackServer: {
      noInfo: true
    }
  })
}

