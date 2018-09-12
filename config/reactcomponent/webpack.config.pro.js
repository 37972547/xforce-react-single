const path=require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // MINI CSS
const HtmlWebPackPlugin = require ("html-webpack-plugin");

const es3ifyPlugin = require('es3ify-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpack = require('webpack');

console.log(__dirname);




module.exports = {
    devtool: 'cheap-module-source-map',
    entry: path.resolve('./index.jsx'),
    output: {
        path: path.resolve('dist'),
        filename: 'js/[name].js',
        publicPath: '/',
        chunkFilename: 'js/[name].js',
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
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
            filename: "./index.html",
            minify: {
                // 压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: false, // 删除空白符与换行符
            },
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
    mode: 'production'
};