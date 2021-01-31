module.exports = ({ paths }) => {
  return {
    test: /\.(js|jsx|mjs)$/,
    include: paths.appSrc,
    loader: require.resolve("babel-loader"),
    options:
      process.env.NODE_ENV === "production"
        ? {
            compact: true,
          }
        : {
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true,
          },
  };
};
