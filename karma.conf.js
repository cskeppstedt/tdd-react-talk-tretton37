const webpackConfig = require('./webpack.config.js')

module.exports = function (config) {
  config.set({
    port: 9001,
    frameworks: ['jasmine'],
    reporters: ['mocha'],
    files: ['./test-bundle.js'],
    preprocessors: {
      './test-bundle.js': ['webpack', 'sourcemap']
    },
    browsers: ['PhantomJS'],
    phantomjsLauncher: {
      exitOnResourceError: true
    },
    captureTimeout: 120000,
    browserNoActivityTimeout: 1000000,
    webpack: {
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
    },
    plugins: config.plugins.concat([
      require('karma-webpack')
    ])
  })
}

