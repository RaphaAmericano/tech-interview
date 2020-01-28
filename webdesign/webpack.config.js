const devEnv = process.env.NODE_ENV !== 'production';
const path = require('path');
const MiniExtract = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: {
        app:'./src/js/index.js'
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].[contenthash].js'
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
            },
            {
                test:/\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use:[
                    {
                        loader: 'file-loader',
                        options:{
                            name: '[name].[ext]',
                            outputPath:'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            name:'[name].[ext]',
                            outputPath: 'img/'
                        }
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
        }),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery: 'jquery',
            jquery: 'jquery',
            'window.jQuery':'jquery',
            Popper:['popper.js', 'default'],
            Alert:'exports-loader?Alert!bootstrap/js/dist/alert',
            Button:'exports-loader?Button!bootstrap/js/dist/alert',
            Carousel:'exports-loader?Carousel!bootstrap/js/dist/alert',
            Collapse:'exports-loader?Collapse!bootstrap/js/dist/alert',
            Dropdown:'exports-loader?Dropdown!bootstrap/js/dist/alert',
            Modal:'exports-loader?Modal!bootstrap/js/dist/alert',
            Popover:'exports-loader?Popover!bootstrap/js/dist/alert',
            Scrollspy:'exports-loader?Scrollspy!bootstrap/js/dist/alert',
            Tab:'exports-loader?Tab!bootstrap/js/dist/alert',
            Tooltip:'exports-loader?Tooltip!bootstrap/js/dist/alert',
            Util:'exports-loader?Util!bootstrap/js/dist/alert'
        })
    ]
}