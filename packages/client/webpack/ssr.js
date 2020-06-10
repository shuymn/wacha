// @ts-check
/* eslint @typescript-eslint/no-var-requires: off */
/* eslint no-undef: off */
const path = require("path");
const merge = require("webpack-merge");
const shared = require("./shared");

/**
 * @param {Object} env
 * @param {Object} argv
 */
const ssr = (env, argv) => {
  /** @type import("webpack").Configuration */
  const config = {
    target: "node",

    entry: {
      render: "./render.tsx",
    },

    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "../dist"),
      library: "SSR",
      libraryTarget: "umd",
      libraryExport: "default",
    },
  };

  return merge(shared(env, argv), config);
};

module.exports = ssr;
