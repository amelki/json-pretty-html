module.exports = {
  entry: './build/src//prettyPrint.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    libraryTarget: 'var',
    library: 'prettyPrint'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader?presets[]=es2015'
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.css$/,
        loaders: ["style", "css"]
      }
    ]
  }
};
