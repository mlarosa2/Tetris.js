module.exports = {
  context: __dirname,
  entry: "./js/tetris.js",
  output: {
    path: "./",
    filename: "bundle.js"
  },
  module: {
      loaders: [
        {
          test: [/\.jsx?$/, /\.js?$/],
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets: ['es2015']
          }
        }
      ]
    },
    devtool: 'source-maps',
    resolve: {
      extensions: ["", ".js"]
    }
};
