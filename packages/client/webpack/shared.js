// @ts-check
/* eslint @typescript-eslint/no-var-requires: off */
/* eslint no-undef: off */
const path = require("path");
const dotenv = require("dotenv");
const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin").default;
const webpack = require("webpack");

/**
 * @param {Object} env
 * @param {Object} argv
 * @param {import('webpack').Configuration['mode']} argv.mode
 */
const shared = (env, argv) => {
  dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
  const isProd = argv && argv.mode === "production";

  /** @type import("webpack").Configuration & import('webpack-dev-server').Configuration */
  const config = {
    context: path.resolve(__dirname, "../src"),
    stats: "errors-only",
    devtool: isProd ? false : "source-map",

    output: {
      filename: isProd ? "[name]-[hash].js" : "[name].js",
      path: path.resolve(__dirname, "../static/build"),
      publicPath: "/build/",
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.(css)$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(jpe?g|png|gif|ttf|otf|eot|svg|woff(2)?)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: isProd ? "[name]-[hash].[ext]" : "[name].[ext]",
                path: path.resolve(__dirname, "../static/build"),
                publicPath: "/build/",
              },
            },
          ],
        },
      ],
    },

    resolve: {
      extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],

      plugins: [
        new TsConfigPathsPlugin({
          configFile: path.resolve(__dirname, "../tsconfig.json"),
          extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
        }),
      ],
    },

    plugins: [
      new webpack.NamedModulesPlugin(),

      new webpack.DefinePlugin({
        "process.env": {
          PUBLIC_URL: JSON.stringify(process.env.PUBLIC_URL),
          BIND_PORT: JSON.stringify(process.env.BIND_PORT),
        },
      }),
    ],

    devServer: {
      compress: true,
      overlay: true,
      contentBase: path.resolve(__dirname, "../static"),
      disableHostCheck: true,
      historyApiFallback: {
        index: "/debug.html",
      },
      hot: true,
      inline: true,
      open: true,
      port: 8080,
      stats: "errors-only",
      watchOptions: {
        ignored: /node_modules/,
      },
    },
  };

  if (isProd) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return config;
};

module.exports = shared;
