const path = require('path');
function assetsPath(_path) {
  return path.posix.join('static', _path);
}
function resolve (dir) {
  return path.join(__dirname, '.', dir);
}

const createLintingRule = () => ({
  test: /\.(js|jsx)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: true
  }
});

const config = {
  devtool: 'cheap-module-source-map',
  entry: path.resolve('./src/index.jsx'),
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      '@': path.resolve('./src')
    }
  },
  module: {
    rules: [
      ...([createLintingRule()]),
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
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [

  ]
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
      for(let key in entry) {
        entry[key] = path.resolve(entry[key]);
      }
    }

    config.entry = entry;
  }

  //别名模块引入
  if(utils.isObject(alias)) {
    for(let key in alias) {
      alias[key] = path.resolve(alias[key]);
    }
    config.resolve.alias = alias
  }
}*/

module.exports = config
