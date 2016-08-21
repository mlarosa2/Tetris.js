module.exports = {
  context: __dirname,
  entry: "./js/tetris.js",
  output: {
    path: "./",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["", ".js"]
  },
  devtool: source-map
};
