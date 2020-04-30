const path = require('path')

// 进入模板目录
process.chdir(path.join(__dirname, 'smoke/template'))

describe('buider-webpack test case', () => {
  require('./unit/webpack-base-test')
})