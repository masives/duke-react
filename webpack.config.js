var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  module: {
      rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader'
              }
          },
          {
              test: /\.css$/,
              use: [
                  'style-loader',
                  'css-loader'
              ]
          },
          {
              test: /\.scss$/,
              use: [
                  'style-loader',
                  'css-loader',
                  'sass-loader'
              ]
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ]
          }
      ]
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: './src/index.html'
      })
  ]
};
