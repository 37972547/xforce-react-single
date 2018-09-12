const path = require('path');
const MiniCssExtractPlugin = require(path.resolve('node_modules', 'mini-css-extract-plugin'));
const OptimizeCSSAssetsPlugin = require(path.resolve('node_modules', 'optimize-css-assets-webpack-plugin')); // MINI CSS
const HtmlWebPackPlugin = require(path.resolve('node_modules', 'html-webpack-plugin'));
const es3ifyPlugin = require(path.resolve('node_modules', 'es3ify-webpack-plugin'));
const UglifyJsPlugin = require(path.resolve('node_modules', 'uglifyjs-webpack-plugin'));
const CleanWebpackPlugin = require(path.resolve('node_modules', 'clean-webpack-plugin'));
const webpack = require(path.resolve('node_modules', 'webpack'));

console.log(__dirname);

// const devMode = process.env.NODE_ENV !== 'production'
// console.log(process.env.NODE_ENV);
// console.log(devMode);
// const devMode = false;
function assetsPath(_path) {
  return path.posix.join('static', _path);
}
const config = {
  devtool: 'cheap-module-source-map',
  entry: path.resolve('./src/index.jsx'),
  // output: {
  //     path: path.resolve(__dirname, 'dist'),
  //     filename: 'app.bundle.js'
  // },
  output: {
    path: path.join(__dirname,'dist'),
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
          loader: path.resolve('node_modules', 'babel-loader'),
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
            loader: path.resolve('node_modules', 'html-loader'),
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          MiniCssExtractPlugin.loader,
          path.resolve('node_modules', 'css-loader'),
          path.resolve('node_modules', 'sass-loader')
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: path.resolve('node_modules', 'url-loader'),
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: path.resolve('node_modules','url-loader'),
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: path.resolve('node_modules', 'url-loader'),
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
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
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 30000,
    compress: true,
    inline: true,
    hot: false,
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

module.exports = config
