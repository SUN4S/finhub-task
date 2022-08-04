const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

let mode = process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
  mode: mode,
  entry: {
    bundle: path.resolve(__dirname, "src/index.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "../server/build/public"),
    filename: "./[name].js",
    clean: true,
    assetModuleFilename: "images/[name][ext][query]",
    publicPath: "/",
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      minSize: 10000,
      maxSize: 250000,
    },
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  performance: {
    hints: mode === "development" && false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(s[ac]|c)ss/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      title: "Finhub Lookup",
    }),
    new webpack.DefinePlugin({
      "process.env.SERVER_URL":
        mode === "development"
          ? JSON.stringify("http://localhost:3030")
          : JSON.stringify(""),
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts", ".js"],
  },
};
