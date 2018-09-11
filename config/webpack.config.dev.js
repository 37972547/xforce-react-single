const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const portfinder = require('portfinder');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const autoprefixer = require('autoprefixer'));
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseWebpackConfig = require('./webpack.config.base.js');
const es3ifyPlugin = require('es3ify-webpack-plugin'));
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

console.log(__dirname);

function assetsPath(_path) {
  return path.posix.join('static', _path);
}
const devWebpackConfig = merge(baseWebpackConfig, {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9' // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009'
                })
              ]
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
    host: 'localhost',
    compress: true,
    inline: true,
    hot: true,
    overlay: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      // filename: devMode ? '[name].css' : '[name].[hash].css',
      // chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
      filename: 'index.css',
      chunkFilename: '[id].css'
    }),
    new webpack.DefinePlugin({
      'SERVICE_URL': JSON.stringify("http://localhost:3000")
    })
  ],
  mode: 'development'
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || devWebpackConfig.devServer.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer config
      devWebpackConfig.devServer.port = port;

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`]
        }
      }));

      resolve(devWebpackConfig);
    }
  });
});
