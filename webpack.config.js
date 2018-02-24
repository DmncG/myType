const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractPlugin = new ExtractTextPlugin({
  filename: './public/css/style.css'
})
console.log('webpack dirname***', path.join(__dirname, 'public', 'css'))
module.exports = {
  entry: './src/index.js',
  output: {
    filename: './public/bundle.js',
    path: __dirname
  },
  context: __dirname,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    extractPlugin
  ]
}
