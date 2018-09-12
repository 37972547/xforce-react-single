const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // MINI CSS

const HtmlWebPackPlugin = require("html-webpack-plugin");

const es3ifyPlugin = require('es3ify-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpack = require('webpack');

const packageCfg = require ("./package");



module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './src/TestComponent.jsx',
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    libraryTarget: "umd",     //"var",
    library: packageCfg.name
  },
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    // "react": "React"
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      react: 'anujs/dist/ReactIE.js',
      'react-dom': 'anujs/dist/ReactIE.js',
      'prop-types': 'anujs/lib/ReactPropTypes',
      devtools: 'anujs/lib/devtools',
      'create-react-class': 'anujs/lib/createClass',
    }
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {minimize: true}
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          //devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      }

    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist','build'], {
      root: path.resolve(),
      verbose: true,
      dry: false
    }),
    new es3ifyPlugin(),
    new HtmlWebPackPlugin({
      template: path.resolve("./index.html"),
      filename: "./index.html"
    }),
    // new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      // filename: devMode ? '[name].css' : '[name].[hash].css',
      // chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
      filename: 'index.css',
      chunkFilename: '[id].css'
    })
  ],
  mode: 'production'
};