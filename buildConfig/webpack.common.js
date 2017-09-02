var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var helpers = require('./helpers');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: helpers.root('build'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: [
                    helpers.root('src'),
                    helpers.root('XenaModule')
                ],
                exclude: [
                    helpers.root('logic')
                ],
                loaders: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFileName: './src.tsconfig.json',
                            transpileOnly: true
                        }
                    }, 'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                include: helpers.root('src'),
                use: 'raw-loader'
            }
            , {
                test: /\.css$/,
                exclude: helpers.root('src'),
                loaders: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader?sourceMap'
                }
                ]
            }
        ]
    },

    plugins: [
        new ForkTsCheckerWebpackPlugin({tsconfig: './client.tsconfig.json'}),
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./src'), // location of your src
            {} // a map of your routes
        ),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CopyWebpackPlugin([
            {from: 'src/assets'},
            // {from: 'src/thirdparty', to: 'thirdparty'},
            // {from: 'src/styles.css', to: 'thirdparty'}
        ])
    ]
};
// console.log(JSON.stringify(module.exports, undefined, 2));
