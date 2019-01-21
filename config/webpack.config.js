const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }, {
            'test': /\.css$/,
            'use': [
                MiniCssExtractPlugin.loader,
                'css-loader',
            ],
        },
    ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: __dirname + '../dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: '../dist',
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
            inject: false,
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
    ]
};


// const NODE_ENV = process.argv.indexOf('-p') !== -1 ? 'production' : '';
// const path = require('path');
// const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const autoprefixer = require('autoprefixer');
// const WebpackShellPlugin = require('./WebpackShellPlugin');
// const WebpackNotifierPlugin = require('webpack-notifier');
//
// module.exports = {
//     entry: {
//         app: ['babel-polyfill', path.resolve('./src/app.js')],
//         issueTimer: [path.resolve('./src/timer/issueTimer.js')],
//     },
//
//     output: {
//         path: path.resolve('../resources/static'),
//         filename: 'js/[name].js',
//         publicPath: '/',
//     },
//
//     devtool: NODE_ENV ? '' : 'inline-source-map',
//
//     module: {
//         rules: [
//             {
//                 test: /\.(js|jsx)$/,
//                 exclude: [
//                     path.resolve('./node_modules'),
//                     path.resolve('./static'),
//                 ],
//                 loader: 'babel-loader',
//             },
//             {
//                 test: /\.(css)$/,
//                 loader: ExtractTextPlugin.extract({
//                     use: [
//                         {
//                             loader: 'css-loader',
//                             options: {
//                                 sourceMap: true,
//                             },
//                         },
//                         {
//                             loader: 'postcss-loader',
//                             options: {
//                                 ident: 'postcss',
//                                 plugins: () => {
//                                     return [
//                                         autoprefixer({ browsers: ['last 10 versions'] }),
//                                     ];
//                                 },
//                                 sourceMap: true,
//                             },
//                         },
//                     ],
//                 }),
//             },
//         ],
//     },
//
//     plugins: [
//         new webpack.DefinePlugin({
//             'process.env': {
//                 'NODE_ENV': JSON.stringify(NODE_ENV),
//                 'BUILD_PROFILE': JSON.stringify(process.env.BUILD_PROFILE),
//             },
//         }),
//         new WebpackNotifierPlugin(),
//         new ExtractTextPlugin({
//             filename: 'css/[name].css',
//         }),
//         new WebpackShellPlugin({
//             onBuildEnd: ['./gradlew :web:applyStaticToBuild'],
//         }),
//     ],
// };
