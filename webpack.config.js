const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractPlugin = new ExtractTextPlugin({
  filename: 'css/style.css'
})
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const PUBLIC_PATH = 'https://mytype-4ce9d.firebaseapp.com/'
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
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
    // new SWPrecacheWebpackPlugin(
    //   {
    //     cacheId: 'myType',
    //     dontCacheBustUrlsMatching: /\.\w{8}\./,
    //     filename: 'service-worker.js',
    //     minify: true,
    //     navigateFallback: PUBLIC_PATH + 'index.html',
    //     staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    //   }
    // )
    new WorkboxPlugin({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true
    })
  ]
}
