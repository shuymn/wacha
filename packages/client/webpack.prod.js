const path = require("path");
const DotenvPlugin = require("dotenv-webpack");
const RobotstxtPlugin = require("robotstxt-webpack-plugin");
const webpack = require("webpack");
const ManifestPlugin = require("webpack-manifest-plugin");
const PwaManifestPlugin = require("webpack-pwa-manifest");
const WorkboxPlugin = require("workbox-webpack-plugin");

const cacheId = "wacha";

/** @type import('webpack').Configuration */
const config = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].bundle.js",
    chunkFilename: "[name].[contenthash].[id].bundle.js",
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new DotenvPlugin({ path: path.resolve(__dirname, "../../.env.prod") }),
    new ManifestPlugin(),
    new PwaManifestPlugin({
      filename: "manifest.webmanifest",
      name: "wacha",
      short_name: "wacha",
      crossorigin: "use-credentials",
    }),
    new WorkboxPlugin.GenerateSW({
      clientClaim: true,
      skipWaiting: true,
      cacheId,
      runtimeCaching: [
        {
          urlPattern: /.+(\/|.html)$/,
          handler: "NetworkFirst",
          options: {
            cacheName: cacheId + "-html-cache",
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 7,
            },
          },
        },
        {
          urlPattern: /.+\.(js|css|woff)$/,
          handler: "CacheFirst",
          options: {
            cacheName: cacheId + "-dependent-cache",
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 90,
            },
          },
        },
        {
          urlPattern: /.+\.(png|gif|jpg|jpeg|svg)$/,
          handler: "CacheFirst",
          options: {
            cacheName: cacheId + "-image-cache",
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 30,
            },
          },
        },
      ],
    }),
    new RobotstxtPlugin(),
  ],
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    runtimeChunk: {
      name: "manifest",
    },
    minimize: true,
    splitChunks: {
      minSize: 10000,
      maxSize: 250000,
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
};

module.exports = config;
