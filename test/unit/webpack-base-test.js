const assert = require('assert')

describe('webpack.base.config.js test case', () => {

  const baseConfig = require('../../lib/webpack.base.config')

  // console.log(baseConfig)
  it('entry', () => {
    assert.equal(baseConfig.entry.search.indexOf('webpack-tem/test/smoke/template/src/search/index.js') > 1, true)
  })
})