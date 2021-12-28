// webpack.config.js
const path = require("path");
const webpack = require("webpack");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //提取css到单独文件的插件
const { VueLoaderPlugin } = require('vue-loader/dist/index');

const envMode = process.env.envMode;

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    filename: "js/[name].[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: './',
		clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      // 定义环境和变量
      "process.env": {
        envMode,
      },
    }),
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "./css/[name].[contenthash].css",
      chunkFilename: "./css/[id].[contenthash].css",
    }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, "../public/index.html"),
    //   filename: "index.html",
    //   title: "webpack5+vue3",
    //   minify: {
    //     html5: true, // 根据HTML5规范解析输入
    //     collapseWhitespace: true, // 折叠空白区域
    //     preserveLineBreaks: false,
    //     minifyCSS: true, // 压缩文内css
    //     minifyJS: true, // 压缩文内js
    //     removeComments: false, // 移除注释
    //   },
    //   files: prodMode ? cdn.prod : cdn.dev,
    // }),
    new VueLoaderPlugin(), //new一个实例
  ],
};
