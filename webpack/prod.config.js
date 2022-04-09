// webpack.config.js
const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const baseWebpack = require("./default.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InitMainFastPlugin = require("./plugins/init-mainfest");

const devWebpack = {
  mode: "production",
  entry: {
    background: path.resolve(__dirname, "../src/background/index.ts"),
    content: path.resolve(__dirname, "../src/content/main.ts"),
    popup: path.resolve(__dirname, "../src/popup/main.ts"),
  },
  output: {
    filename: "js/[name].[contenthash:8].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "./",
    clean: true,
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new webpack.DefinePlugin({
      // 定义环境和变量
      ENV: JSON.stringify("production"),
      BIQUGE_DOMAIN: JSON.stringify("https://www.shuquge.com"),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../static/prod.html"),
      filename: "index.html",
      title: "chrome插件模拟demo",
      chunks: ['popup'],
      minify: {
        html5: true, // 根据HTML5规范解析输入
        collapseWhitespace: true, // 折叠空白区域
        preserveLineBreaks: false,
        minifyCSS: true, // 压缩文内css
        minifyJS: true, // 压缩文内js
        removeComments: false, // 移除注释
      },
    }),
    new InitMainFastPlugin(),
  ],
};

module.exports = merge(baseWebpack, devWebpack);
