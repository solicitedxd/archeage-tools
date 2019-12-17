const webpack = require('webpack');
const path = require('path');
const loaders = require('./webpack.loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const pkg = require('./package.json');

const devConfig = require('./webpack.config.js');

const { join, resolve } = path;

const root = resolve(__dirname);
const src = join(root, 'src');

module.exports = {
  entry: [
    join(src, 'index'),
  ],
  mode: 'production',
  output: {
    publicPath: '/',
    path: path.join(root, 'public'),
    filename: 'bundle.[hash].js',
  },
  resolve: {
    alias: Object.assign({}, devConfig.resolve.alias, {
      config: join(src, 'config', 'production.js'),
    }),
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
      __VERSION__: JSON.stringify(pkg.version),
      __DEVELOPMENT__: false,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
  ],
};
