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
        options: {
        },
      },
    ],
    exclude: /(node_modules)/,
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader',
    exclude: /(node_modules)/,
  },
  {
    test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3|ico)$/,
    loader: 'file-loader',
  },
];
