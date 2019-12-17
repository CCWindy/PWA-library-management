const path = require("path");
const merge = require("webpack-merge");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const common = require("./webpack.common.config");

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'js/[name].[hash:8].bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    open: true,
    port: 9000,
    compress: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      hash: false
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});

