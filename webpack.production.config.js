const webpack = require('webpack');
const path = require('path');
const loaders = require('./webpack.loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const devConfig = require('./webpack.config.js');

const { join, resolve } = path;

const root = resolve(__dirname);
const src = join(root, 'src');
const styles = join(root, 'styles');

module.exports = {
  entry: [
    join(src, 'index'),
    join(styles, 'index'),
  ],
  mode: 'production',
  output: {
    publicPath: './',
    path: path.join(__dirname, 'public'),
    filename: '[chunkhash].js',
  },
  resolve: {
    alias: Object.assign({}, devConfig.resolve.alias, {}),
    extensions: devConfig.resolve.extensions,
  },
  module: {
    rules: loaders,
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true,
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new ExtractTextPlugin({
    //   filename: 'style.css',
    //   allChunks: true,
    // }),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      files: {
        // css: ['style.css'],
        js: ['bundle.js'],
      },
    }),
  ],
};
