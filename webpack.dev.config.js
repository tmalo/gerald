const webpack = require("webpack");
const path = require("path");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

let config = require("./webpack.config.js");

config.mode = "development";
config.devtool = "source-map";

config.devServer = {
  contentBase: path.join(__dirname, "public"),
  compress: true,
  hot: true,
  port: process.env.PORT || 9000,
};

config.plugins.concat([
  // Watcher doesn't work well if you mistype casing in a path so we use
  // a plugin that prints an error when you attempt to do this.
  // See https://github.com/facebook/create-react-app/issues/240
  new CaseSensitivePathsPlugin(),

  new webpack.HotModuleReplacementPlugin(),
]);

module.exports = config;
