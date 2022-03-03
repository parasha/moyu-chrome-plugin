// webpack.config.js
const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const baseWebpack = require("./default.config");

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
    publicPath: "",
    clean: true,
  },
  optimization: {
    minimize: false,
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendors: {
          //拆分第三方库（通过npm|yarn安装的库）
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "initial",
          priority: -10,
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      // 定义环境和变量
      ENV: JSON.stringify("production"),
      BIQUGE_DOMAIN: JSON.stringify("https://www.shuquge.com"),
    }),
  ],
};

module.exports = merge(baseWebpack, devWebpack);
