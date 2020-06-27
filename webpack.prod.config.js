const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

let config = require("./webpack.config.js");
const paths = require("./utils/paths");

config.mode = "production";
config.devtool = false;
config.optimization = {
  splitChunks: {
    chunks: "all",
    automaticNameDelimiter: "~",
    cacheGroups: {
      vendor: {
        maxSize: 266240,
        test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
        name: "vendor",
        chunks: "all",
      },
      defaultVendors: {
        test: /[\\/]node_modules[\\/]/,
        // cacheGroupKey here is `commons` as the key of the cacheGroup
        name(module, chunks, cacheGroupKey) {
          const allChunksNames = chunks.map((item) => item.name).join("~");
          return `core-${allChunksNames}`;
        },

        priority: -10,
        reuseExistingChunk: true,
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true,
      },
    },
  },
};

config.plugins.push(
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, "public"),
        to: path.resolve(__dirname, "build"),
      },
    ],
  }),

  // Generate a service worker script that will precache, and keep up to date,
  // the HTML & assets that are part of the webpack build.
  new WorkboxWebpackPlugin.GenerateSW({
    clientsClaim: true,
    exclude: [/\.map$/, /asset-manifest\.json$/],
    navigateFallback: paths.publicUrlOrPath + "index.html",
    navigateFallbackDenylist: [
      // Exclude URLs starting with /_, as they're likely an API call
      new RegExp("^/_"),
      // Exclude any URLs whose last part seems to be a file extension
      // as they're likely a resource and not a SPA route.
      // URLs containing a "?" character won't be blacklisted as they're likely
      // a route with query params (e.g. auth callbacks).
      new RegExp("/[^/?]+\\.[^/]+$"),
    ],
  })
);

module.exports = config;
