const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // MINI CSS
const HtmlWebPackPlugin = require('html-webpack-plugin');
const es3ifyPlugin = require('es3ify-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

console.log(__dirname);

// const devMode = process.env.NODE_ENV !== 'production'
// console.log(process.env.NODE_ENV);
// console.log(devMode);
// const devMode = false;

const config = {
  devtool: 'cheap-module-source-map',
  entry: path.resolve('./src/index.jsx'),
  // output: {
  //     path: path.resolve(__dirname, 'dist'),
  //     filename: 'app.bundle.js'
  // },
  output: {
    path: path.resolve('dist'),
    filename: 'js/[name].js',
    publicPath: '/',
    chunkFilename: 'js/[name].js'
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      react: 'anujs/dist/ReactIE.js',
      'react-dom': 'anujs/dist/ReactIE.js',
      'prop-types': 'anujs/lib/ReactPropTypes',
      devtools: 'anujs/lib/devtools',
      'create-react-class': 'anujs/lib/createClass'
    }
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          ie8: true
        },
        sourceMap: true
      })
    ]
  },
  module: {
    rules: [
      // {
      //     test: /\.js|jsx$/,
      //     exclude: /node_modules/,
      //     use: {
      //         loader: "babel-loader"
      //     }
      // },
      {
        test: /\.js|jsx$/,
        use: {
          loader:'babel-loader',
          options: {
            presets: [
              [
                'env',
                {
                  targets: {
                    browsers: ['last 2 versions', 'ie >= 7']
                  },
                  modules: 'commonjs',
                  useBuiltIns: true,
                  debug: false
                }
              ],
              'react',
              'stage-2'
            ],
            plugins: ['transform-runtime']
          }
        },
        include: [path.resolve('src')]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader:'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          MiniCssExtractPlugin.loader,
         'css-loader',
         'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader:'url-loader',
            options: {
              limit: 10000,
              name: '[name].[ext]'
            }
          },
         'image-webpack-loader' // 压缩图片
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader:  'url-loader',
            options: {
              limit: 10000,
              name: '[name].[ext]'
            }
          },
          'image-webpack-loader' // 压缩图片
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        use: [
          'file-loader'
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
    new es3ifyPlugin(),
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
      filename: 'index.css',
      chunkFilename: '[id].css'
    }),
    new webpack.DefinePlugin({
      'SERVICE_URL': JSON.stringify("")
    })
  ],
  devServer: {
    contentBase: 'dist',
    port: 30000,
    compress: true,
    inline: true,
    hot: true,
    overlay: true
  },
  mode: 'production'
};

/*if(webpackConfigJson) {
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
}*/

module.exports = config;
