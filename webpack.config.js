const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: [
    'react-hot-loader/patch', // hot module replacement
    'webpack-dev-server/client?http://localhost:8080', // hot module replacement
    'webpack/hot/only-dev-server', // hot module replacement
    './src/entry.jsx'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    hot: true, // hot module replacement
    publicPath: '/public',
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'] // order of resolution from left to right on imports without extension (import App from './App)
  },
  stats: {
    colors: true,
    reasons: true
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // hot module replacement
    new webpack.NamedModulesPlugin(), // hot module replacement
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};
