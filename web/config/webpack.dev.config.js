const path = require('path');
const merge = require('webpack-merge');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const common = require('./webpack.common.config');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'js/[name].[hash].bundle.js',
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    open: true,
    port: 9000,
    compress: true,
    hot: true,
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      hash: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
