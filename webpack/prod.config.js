// webpack.config.js
const { merge } = require("webpack-merge");
const baseWebpack = require('./default.config');

const devWebpack= {
  mode: "production",
  output: {
    publicPath: "",
    clean: true,
  }
};


module.exports = merge(baseWebpack, devWebpack);