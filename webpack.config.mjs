import path from "path";

export default {
  mode: "development",
  entry: "./src/battleship.js", // Update this if your entry file is different
  output: {
    filename: "bundle.js",
    path: path.resolve(process.cwd(), "dist"), // Updated for ES Module compatibility
    clean: true,
  },
  devServer: {
    static: "./dist",
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};