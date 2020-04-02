const path = require('path');

module.exports = [
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /(node_modules|public)/,
  },
  {
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
        options: {},
      },
    ],
    exclude: /(node_modules)/,
  },
  {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader',
    exclude: /(node_modules)/,
  },
  {
    test: /\.(ico)$/,
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
    },
  },
  {
    test: /\.(jpe?g|gif|png|wav|mp3)$/,
    loader: 'file-loader',
    options: {
      outputPath: (url) => {
        return url.replace(/^src\//, '');
      },
      name: '[path][name].[ext]',
    },
  },
  {
    test: /\.(svg|woff|ttf|eot|woff2)$/,
    loader: 'file-loader',
    options: {
      name: 'fonts/[name].[ext]',
    },
  },
];
