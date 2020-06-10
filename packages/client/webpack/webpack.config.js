// @ts-check
/* eslint @typescript-eslint/no-var-requires: off */
/* eslint no-undef: off */
const main = require("./main");
const ssr = require("./ssr");

/**
 * @param {Object} env
 * @param {Object} argv
 */
module.exports = (env, argv) => {
  return [main(env, argv), ssr(env, argv)];
};
