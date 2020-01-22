const devEnv = process.env.NODE_ENV !== 'production';
const path = require('path');
const MiniExtract = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app:'./src/js/index.js',
        vendor:['jquery', 'popper.js']
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].[contenthash].js'
    },
    optimization:{
        splitChunks:{
            chunks: 'all'
        }
    },
    module: {
        rules:[
            {
                test: /\.pug$/,
                use: 'pug-loader',
            },
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use: {
                    loader:'babel-loader'
                }
            },
            {
                test: /\.scss/,
                use: [
                    {
                        loader: MiniExtract.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniExtract({ 
            filename: devEnv ? '[name].css' : '[name].[hash].css',
            chunkFilename: devEnv ? '[id].css' : '[id].[hash].css'
        }),
        new HtmlWebpackPlugin({
            title: 'Site name',
            hash: true,
            template: 'index.pug',
            filename: 'index.html',
            inject: false
        })
    ]
}