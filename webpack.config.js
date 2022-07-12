const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["@babel/polyfill", path.join(__dirname, "client/index.js")],

  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
  },

  mode: process.env.NODE_ENV,

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "client/index.html"),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: /node_modules/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  devServer: {
    static: {
      publicPath: "build",
      directory: path.resolve(__dirname, "build"),
    },
    proxy: {
      "/": "http://localhost:3000",
      "/update/*": "http://localhost:3000",
      "/auth/*": "http://localhost:3000",
    },
  },
};
