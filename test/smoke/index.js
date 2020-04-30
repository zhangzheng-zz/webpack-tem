const path = require('path')
const webpack = require('webpack')
const rimraf = require('rimraf')
const Mocha = require('mocha')

const mocha = new Mocha({
  timeout: '10000ms'
})

// 进入到构建目录
process.chdir(path.join(__dirname, 'template'))

rimraf('./dist', () => {
  const prodConfig = require('../../lib/webpack.prod.config')

  // 1、webpack 构建测试
  webpack(prodConfig, (err, stats) => {

    if (err) {
      console.error(err)
      process.exit(2)
    }

    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false
    }))

    // 2、测试用例
    mocha.addFile(path.join(__dirname, './template/html-test.js'))
    mocha.addFile(path.join(__dirname, './template/css-js-test.js'))
    mocha.run()

  })
})
