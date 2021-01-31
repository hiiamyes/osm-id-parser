const path = require("path");
const { merge } = require("webpack-merge");
const base = require("./webpack.config.base.js");
const baseConfig = base();

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "cheap-module-source-map",
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  output: {
    devtoolModuleFilenameTemplate: (info) =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, "/"),
    hotUpdateChunkFilename: "hot/hot-update.js",
    hotUpdateMainFilename: "hot/hot-update.json",
  },
  performance: {
    hints: false,
  },
});
