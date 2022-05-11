module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactProMetronome',
      externals: {
        react: 'React'
      }
    }
  },
  karma: {
    testContext: 'tests.webpack.js',
    browsers: ['ChromeHeadless']
  }
}
