const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractPlugin = new ExtractTextPlugin({
  filename: './public/css/style.css'
})
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const PUBLIC_PATH = 'https://mytype-4ce9d.firebaseapp.com/'

module.exports = {
  entry: './src/index.js',
  output: {
    filename: './public/bundle.js',
    path: __dirname,
    publicPath: PUBLIC_PATH
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
    extractPlugin,
    new SWPrecacheWebpackPlugin(
      {
        cacheId: 'myType',
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: './public/service-worker.js',
        minify: true,
        navigateFallback: PUBLIC_PATH + 'index.html',
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      }
    )
  ]
}
