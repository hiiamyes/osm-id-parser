const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  target: "web",
  devtool: "source-map",
  entry: {
    content_scripts: "./src/content_scripts/index.js"
  },
  output: {
    path: __dirname,
    filename: "src/[name]/build/[name].bundle.js"
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, "src"),
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, "node_modules"),
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "url-loader?limit=464600&minetype=application/font-woff"
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|otf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "file-loader"
      }
    ]
  },
  resolve: {
    modules: [path.join(__dirname, "src", "browser_action"), "node_modules"]
  }
};
