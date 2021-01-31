require("dotenv").config();
const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

const paths = require("./paths");
const jsRule = require("./rules/js-rule.js");
const cssRule = require("./rules/css-rule.js");

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";

module.exports = () => {
  return {
    entry: {
      content_scripts: "./src/content_scripts/index.js",
    },
    output: {
      path: path.resolve(__dirname, "../build"),
      filename: "[name].bundle.js",
    },
    resolve: {
      modules: ["node_modules", paths.appNodeModules],
      extensions: [".js", ".json"],
      alias: {
        src: path.resolve(__dirname, "../src/"),
      },
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve("url-loader"),
              options: {
                limit: 10000,
                name: "static/media/[name].[hash:8].[ext]",
              },
            },
            jsRule({ paths }),
            cssRule({ shouldUseSourceMap }),
            // "file" loader makes sure those assets get served by WebpackDevServer.
            // When you `import` an asset, you get its (virtual) filename.
            // In production, they would get copied to the `build` folder.
            // This loader doesn't use a "test" so it will catch all modules
            // that fall through the other loaders.
            {
              loader: require.resolve("file-loader"),
              // Exclude `js` files to keep "css" loader working as it injects
              // its runtime that would otherwise be processed through "file" loader.
              // Also exclude `html` and `json` extensions so they get processed
              // by webpacks internal loaders.
              exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
              options: {
                name: "static/media/[name].[hash:8].[ext]",
              },
            },
            // ** STOP ** Are you adding a new loader?
            // Make sure to add the new loader(s) before the "file" loader.
          ],
        },
      ],
    },
    plugins: [new Dotenv()],
    // optimization: {
      // https://webpack.js.org/plugins/split-chunks-plugin/
      // splitChunks: {
        //     cacheGroups: {
        //       vendor: {
        //         test: /[\\/]node_modules[\\/]/,
        //         name: "vendor",
        //         chunks: "all",
        //       },
        //     },
      // },
      // runtimeChunk: "single",
    // },
    // externals: {
      // react: "React",
      // "react-dom": "ReactDOM",
      // leaflet: "Leaflet",
      // d3: "d3",
      // "lodash/fp": "lodash",
      // "styled-components": "styled",
    // },
  };
};
