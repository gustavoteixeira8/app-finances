const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry: resolve('src', 'main.js'),
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'public', 'assets')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    optimization: {
        minimize: false,
        minimizer: [ new CssMinimizerPlugin() ],
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            // {
            //     test: /\.(sa|sc|c)ss$/,
            //     use: [MiniCssExtractPlugin.loader, 'css-loader']
            // },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                }
            },
        ]
    },
    devtool: 'source-map',
}