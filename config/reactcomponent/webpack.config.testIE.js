const path=require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // MINI CSS
const HtmlWebPackPlugin = require ("html-webpack-plugin");
const es3ifyPlugin = require('es3ify-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

console.log(__dirname);

// const devMode = process.env.NODE_ENV !== 'production'
// console.log(process.env.NODE_ENV);
// console.log(devMode);
// const devMode = false;






module.exports = {
    devtool: 'cheap-module-source-map',
    entry: path.resolve('./index.jsx'),
    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    //     filename: 'app.bundle.js'
    // },
    output: {
        path: path.resolve('dist'),
        filename: 'js/[name].js',
        publicPath: '/',
        chunkFilename: 'js/[name].js',
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
        alias: {
            react: 'anujs/dist/ReactIE.js',
            'react-dom': 'anujs/dist/ReactIE.js',
            'prop-types': 'anujs/lib/ReactPropTypes',
            devtools: 'anujs/lib/devtools',
            'create-react-class': 'anujs/lib/createClass',
        },
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    ie8: true,
                },
                sourceMap: true,
            }),
        ],
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
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                'env',
                                {
                                    targets: {
                                        browsers: ['last 2 versions', 'ie >= 7'],
                                    },
                                    modules: 'commonjs',
                                    useBuiltIns: true,
                                    debug: false,
                                },
                            ],
                            'react',
                            'stage-2',
                        ],
                        plugins: ['transform-runtime'],
                    },
                },
                include: [path.resolve('src')],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
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
            },
            {
                test: /\.(png|jpg|gif)$/i,
                exclude: /(node_modules|bower_components)/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: '[name].[ext]'
                        }
                    },
                    'image-webpack-loader', // 压缩图片
                ]
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
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            // filename: devMode ? '[name].css' : '[name].[hash].css',
            // chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
            filename: 'index.css',
            chunkFilename: '[id].css'
        })
    ],
    devServer: {
        contentBase: path.resolve("dist"),
        port:30000,
        compress : true,
        inline:true,
        hot:false,
        overlay: true,
    },
    mode: 'development'
};