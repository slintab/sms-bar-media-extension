const path = require("path");

const config = {
  entry: "./src/composer.jsx",
  output: {
    path: path.resolve(__dirname, "assets"),
    filename: "composer.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  mode: "development",
};

module.exports = config;
