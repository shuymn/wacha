module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      "@babel/preset-react",
      "@babel/preset-typescript",
      [
        "@babel/preset-env",
        {
          targets: { browsers: [">0.25%", "not ie 11", "not op_mini all"] },
          corejs: 3,
          useBuiltIns: "usage",
        },
      ],
    ],
    plugins: ["babel-plugin-styled-components"],
  };
};
