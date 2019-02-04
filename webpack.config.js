// DEPENDENCIES
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// exporting this configuration
module.exports = {
    // entry point is where webpack starts the bundling
    entry: './src/js/index.js',
    // where to save the bundled file with path to folder and the file name
    output: {
        path: path.resolve(_dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    // specify the folder where webpack should serve our files
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            {
                // look for all files and test if they end in .js
                test: /\.js$/,
                // exclude node_modules folder
                exclude: /node_modules/,
                // and use babel-loader on it
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}