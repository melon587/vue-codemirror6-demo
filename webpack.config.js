const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

const path = require("path");

const config = {
  mode: "development",
  entry: path.resolve(__dirname, "./src/main.js"),
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "./dist"),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "./public"),
    },
    compress: true,
    port: 8080,
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/public/index.html",
      chunks: ["main"],
    }),
    new VueLoaderPlugin(),
  ],
};

module.exports = config;