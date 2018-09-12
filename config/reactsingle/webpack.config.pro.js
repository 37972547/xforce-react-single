const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const Es3ifyPlugin = require('es3ify-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const baseWebpackConfig = require('./webpack.config.base.js');

const webpackConfig = merge(baseWebpackConfig, {
  output: {
    path: path.resolve('dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/',
    chunkFilename: 'js/[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
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
  plugins: [
    new CleanWebpackPlugin(['dist', 'build'], {
      root: path.resolve(),
      verbose: true,
      dry: false
    }),
    new Es3ifyPlugin(),
    new UglifyJSPlugin(),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      minify: {
        // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: false // 删除空白符与换行符
      }
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      // filename: devMode ? '[name].css' : '[name].[hash].css',
      // chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
      filename: 'index.[chunkhash].css',
      chunkFilename: '[id].[chunkhash].css'
    }),
    new webpack.DefinePlugin({
      'SERVICE_URL': JSON.stringify("")
    })
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    // minimizer: true, // [new UglifyJsPlugin({...})]
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        }
      }
    }
  },
  performance: {
    hints: 'warning', // 枚举
    maxAssetSize: 3000000, // 整数类型（以字节为单位）
    maxEntrypointSize: 5000000, // 整数类型（以字节为单位）
    assetFilter: function(assetFilename) { // 提供资源文件名的断言函数
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  mode: 'production'
});

module.exports = webpackConfig;
