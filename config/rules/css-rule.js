const autoprefixer = require("autoprefixer");

module.exports = ({ shouldUseSourceMap }) => {
  return {
    test: /\.css$/,
    use: [
      require.resolve("style-loader"),
      {
        loader: require.resolve("css-loader"),
        options:
          process.env.NODE_ENV === "production"
            ? {
                importLoaders: 1,
                sourceMap: shouldUseSourceMap,
              }
            : {
                importLoaders: 1,
              },
      },
      {
        loader: require.resolve("postcss-loader"),
        options: {
          ident: "postcss",
          plugins: () => [
            require("postcss-flexbugs-fixes"),
            autoprefixer({
              flexbox: "no-2009",
            }),
          ],
        },
      },
    ],
  };
};
