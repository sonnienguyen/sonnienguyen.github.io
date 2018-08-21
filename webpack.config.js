const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
  entry: {
    App: './src/js/App.js',
    Vendor: './src/js/Vendor.js',
  },
  output: {
    path: path.resolve(__dirname, 'docs/assets/js'),
    filename: '[name].js',
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    // run shell commands after webpack builds
    new WebpackShellPlugin({
      onBuildEnd: ['bundle exec jekyll build --config ./docs/_config.yml'],
    }),
    new CleanWebpackPlugin(['_site']),
  ],
  // Tell webpack to minimize the bundle.
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
    ],
  },
};
