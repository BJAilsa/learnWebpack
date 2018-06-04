const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');

module.exports = {
    //入口
    entry: {
       entry: './src/entry.js',
       entry2: './src/entry2.js'
    },
    //出口
    output: {
        path: path.resolve(__dirname,'./dist'),//使用./dist和dist一样
        filename: '[name].js'
    },
    module: {  
        rules:[
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },{
                test: /\.(png|jpg|gif)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 500000
                    }
                }]
            },{
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader'
                }],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new uglify(),
        new htmlPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: './src/index.html'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname,'./dist'),
        host: 'lm.jd.com',
        compress: true,
        port: 3023
    }
}