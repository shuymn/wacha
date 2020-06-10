// @ts-check
/* eslint @typescript-eslint/no-var-requires: off */
/* eslint no-undef: off */
const merge = require("webpack-merge");
const OfflinePlugin = require("offline-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const shared = require("./shared");

/**
 * @param {Object} env
 * @param {Object} argv
 */
const main = (env, argv) => {
  /** @type import("webpack").Configuration */
  const config = {
    entry: {
      main: "./main.tsx",
    },

    plugins: [
      new ManifestPlugin(),
      new OfflinePlugin({
        caches: { main: [":rest:"] },
        ServiceWorker: {
          output: "sw.js",
          publicPath: "/sw.js",
          cacheName: "wacha",
          minify: true,
        },
      }),
    ],
  };

  return merge(shared(env, argv), config);
};

module.exports = main;
