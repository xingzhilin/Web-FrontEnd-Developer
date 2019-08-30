const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            { test: /\.css$/, use: 'css-loader' },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader', 'css-loader', 'less-loader'
                ]
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            title: 'zhilin App',
            filename: 'index.html',
            template: './index.html'
        })
    ]
}