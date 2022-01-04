// webpack.config.js
const { merge } = require("webpack-merge");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const baseWebpack = require("./default.config");

const devWebpack = {
  mode: "development",
  watchOptions: {
    // 监听文件变化，重新编译
    aggregateTimeout: 500, // 延迟500毫秒
    ignored: /node_modules/, // 过滤文件
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    host: 'localhost',
    port: 8011,
    
  },

  plugins: [new FriendlyErrorsWebpackPlugin()],
};

module.exports = merge(baseWebpack, devWebpack);
