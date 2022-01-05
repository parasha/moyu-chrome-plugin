// webpack.config.js
const path = require("path");
const { merge } = require("webpack-merge");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const baseWebpack = require("./default.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const devWebpack = {
  mode: "development",
  entry: {
    content: path.resolve(__dirname, "../src/content/index.js"),
    background: path.resolve(__dirname, "../src/background/index.js"),
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    host: "localhost",
    port: 8011,
    open: true,
  },

  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html"),
      filename: "index.html",
      title: "chrome插件模拟demo",
      minify: {
        html5: true, // 根据HTML5规范解析输入
        collapseWhitespace: true, // 折叠空白区域
        preserveLineBreaks: false,
        minifyCSS: true, // 压缩文内css
        minifyJS: true, // 压缩文内js
        removeComments: false, // 移除注释
      },
    }),
  ],
};

module.exports = merge(baseWebpack, devWebpack);
