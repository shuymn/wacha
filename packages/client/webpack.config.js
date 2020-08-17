const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const TSConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { merge } = require("webpack-merge");

/** @type import('webpack').Configuration */
const common = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, "./src"),
        use: "babel-loader",
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "./src"),
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", "jsx", ".ts", ".tsx", ".json"],
    plugins: [
      new TSConfigPathsPlugin.TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "./tsconfig.json"),
        extensions: [".js", "jsx", ".ts", ".tsx", ".json"],
      }),
    ],
  },
  plugins: [
    new HTMLPlugin({ template: path.join(__dirname, "./src/index.html") }),
  ],
};

module.exports = (env, argv) => {
  switch (argv.mode) {
    case "development":
      return merge(common, require("./webpack.dev"));
    case "production":
      return merge(common, require("./webpack.prod"));
    default:
      return common;
  }
};
