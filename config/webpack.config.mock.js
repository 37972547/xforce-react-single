const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // MINI CSS
const autoprefixer = require('autoprefixer');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const es3ifyPlugin = require('es3ify-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpack = require('webpack');

function resolve (dir) {
  return path.join(__dirname, dir)
}

const config = {
  devtool: 'cheap-module-source-map',
  entry: {
    mock: './mock/workAsset.js',
    app: './src/index.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      '@': path.join(__dirname, './src'),
      pages: path.join(__dirname, './src/pages'),
      utils: path.join(__dirname, './src/utils'),
      common: path.join(__dirname, './src/common')
    }
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.resolve(__dirname, 'img/fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.resolve(__dirname, 'media/fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.resolve(__dirname, 'dist/fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: require.resolve('postcss-loader'),
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
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
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
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3002,
    compress: true,
    inline: true,
    hot: true,
    overlay: true
  },
  mode: 'development'
};

if(webpackConfigJson) {
  let entry = webpackConfigJson.entry;
  let alias = webpackConfigJson.alias;
  // 配置入口文件
  if(entry) {
    if(utils.isString(entry)) {
      entry = path.resolve(entry);
    }

    if(utils.isArray(entry)) {
      entry = entry.map(item => {
        return path.resolve(item);
      });
      config.entry  = entry
    }

    if(utils.isObject(entry)) {
      for(key in entry) {
        entry[key] = path.resolve(entry[key]);
      }
    }

    config.entry = entry;
  }

  //别名模块引入
  if(utils.isObject(alias)) {
    for(key in alias) {
      alias[key] = path.resolve(alias[key]);
    }
    config.resolve.alias = alias
  }
}

module.exports = config;
