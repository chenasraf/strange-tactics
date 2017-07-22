let path = require('path')

module.exports = {
  entry: './lib/game.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: "source-map"
  // module: {
  //   rules: [{
  //     test: /\.js$/,
  //     exclude: /(node_modules|bower_components)/,
  //     use: {
  //       loader: 'babel-loader',
  //       options: {
  //         presets: ['env', 'es2016']
  //       }
  //     }
  //   }]
  // }
}
