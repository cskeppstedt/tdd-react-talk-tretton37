const webpackConfig = require('./webpack.config.js')

module.exports = function (config) {
  delete webpackConfig.entry
  delete webpackConfig.output

  config.set({
    frameworks: ['jasmine'],
    reporters: ['mocha'],
    files: [
      { pattern: 'test-bundle.js', watched: false },
      { pattern: 'src/**/*', watched: false, included: false }
    ],
    browsers: ['PhantomJS'],
    phantomjsLauncher: {
      exitOnResourceError: true
    },
    preprocessors: {
      'test-bundle.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {},
    webpackServer: {
      noInfo: true
    }
  })
}

