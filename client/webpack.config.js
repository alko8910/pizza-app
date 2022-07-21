const path = require('path');
const htmlPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/',
  },
  devtool: 'source-map',
  devServer: {
    static: { directory: path.join(__dirname, 'dist') },
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      { test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/, use: 'file-loader' },
      {
        test: /\.(sass|css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')()],
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new htmlPlugin({
      title: 'Membership Application',
      template: './public/index.html',
    }),
  ],
};
