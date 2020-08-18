const path = require("path");
const DotenvPlugin = require("dotenv-webpack");
const webpack = require("webpack");
const NotifierPlugin = require("webpack-notifier");

/** @type import('webpack').Configuration */
const config = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    compress: true,
    overlay: true,
    disableHostCheck: true,
    hot: true,
    inline: true,
    open: true,
    port: 8080,
    watchOptions: {
      ignored: /node_modules/,
    },
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new DotenvPlugin({ path: path.resolve(__dirname, "../../.env.dev") }),
    new NotifierPlugin({ title: "wacha", alwaysNotify: true }),
  ],
};

module.exports = config;
