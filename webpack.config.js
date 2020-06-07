const webpack = require('webpack');
const path = require('path');
const loaders = require('./webpack.loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pkg = require('./package.json');

const { join, resolve } = path;

const root = resolve(__dirname);
const src = join(root, 'src');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '3000';

module.exports = {
  entry: [
    'react-hot-loader/patch',
    join(src, 'index'),
  ],
  mode: 'development',
  devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
  output: {
    publicPath: '/',
    path: join(root, 'public'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      actions: join(src, 'actions'),
      audio: join(src, 'audio'),
      components: join(src, 'components'),
      config: join(src, 'config', 'development.js'),
      constants: join(src, 'constants'),
      data: join(src, 'data'),
      images: join(src, 'images'),
      initialStates: join(src, 'initialStates'),
      reducers: join(src, 'reducers'),
      styles: join(src, 'styles'),
      utils: join(src, 'utils'),
      views: join(src, 'views'),
      // react hot dom fix
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.js', '.jsx', '.scss'],
  },
  module: {
    rules: loaders,
  },
  devServer: {
    contentBase: join(root, 'public'),
    // do not print bundle build stats
    noInfo: true,
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    allowedHosts: [
      'localhost',
      '.mokulu.io',
    ],
    port: PORT,
    host: HOST,
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(pkg.version),
      __DEVELOPMENT__: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        'static',
      ],
    }),
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
  ],
};
