const path = require('path');
const glob = require('glob');
const autoprefixer = require('autoprefixer');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

// 当前执行脚本所在的目录
const projectRoot = process.cwd();

const MPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));

  entryFiles.map((file) => {
    const entryFile = file;
    const match = entryFile.match(/src\/(.*)\/index.js/);
    const pageName = match[1];
    entry[pageName] = entryFile;

    return htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(projectRoot, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: true,
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
        },
      }),
    );
  });

  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = MPA();


module.exports = {
  entry,
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: '[name]_[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer,
              ],
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              // 75px 转 1rem(适用于750px宽的UI图)
              remUnit: 75,
              remPrecision: 8,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer,
              ],
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|svg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            // 小于 10kb 的转为 base64
            limit: 10240,
          },
        },
      },
      {
        test: /\.(woff|woff2|ttf|TTF|oet)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [

    // 错误日志提示
    new FriendlyErrorsWebpackPlugin(),
    // 异常捕获和错误处理
    function errorDone() {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors
          && stats.compilation.errors.length
          && process.argv.indexOf('--watch') === -1) {
          // console.log('build error');
          process.exit(1);
        }
      });
    },

    new MiniCSSExtractPlugin({
      filename: '[name]_[contenthash].css',
    }),
    new CleanWebpackPlugin(),
  ].concat(htmlWebpackPlugins),
  stats: 'errors-only',
};
