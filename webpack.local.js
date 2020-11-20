const path = require('path');
const webpack = require('webpack');
const resolve = dir => path.resolve(__dirname, dir);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');

module.exports = {
    entry: {
        main: projectName + '/src/Main.js',
    },
    resolve: {
        // 设置别名
        alias: {
            '@': resolve('./src'), // 这样配置后 @ 可以指向 src 目录
            '@assets': resolve('./src/assets'), // 这样配置后 @ 可以指向 src 目录
            '@images': resolve('./src/assets/images'), // 这样配置后 @ 可以指向 src 目录
            "@static": resolve('./src/static'),
            // "PIXI": resolve("./src/lib/pixi.min.js"), //用本地的js出错。。。下面直接读取node_module中的pixi.js-legacy
            // "THREE": resolve("./src/lib/three.min.js"),
        }
    },
    plugins: [
        //提供全局的变量，在模块中使用无需用require引入
        new webpack.ProvidePlugin({
            // $: resolve("./src/lib/jquery-3.3.1.min.js"),
            // TweenMax: resolve("./src/lib/greensock/TweenMax.js"),
            // PIXI: 'pixi.js-legacy',
            // THREE: "THREE",
        }),
        new CopyPlugin([{
                from: projectName + '/src/static',
                to: './static',
                'ignore': ['images/**/*']
            },
            {
                from: projectName + '/src/lib',
                to: './lib'
            }
        ]),
        new HtmlWebpackPlugin({
            test: '[hash]',
            chunks: ['main'],
            template: projectName + '/src/template.html'
        }),
    ],
    devServer: {
        // https: {
        //   key: fs.readFileSync('./192.168.18.114-key.pem'),
        //   cert: fs.readFileSync('./192.168.18.114.pem'),
        // },
        host: "192.168.18.114",
        port: global.port,
        contentBase: './dist',
        // stats: 'errors-warnings',
        // hot:true
    },
    externals: {
        $: resolve("./src/lib/jquery-3.3.1.min.js"),
        TweenMax: resolve("./src/lib/greensock/TweenMax.js"),
        PIXI: 'pixi.js-legacy',
        THREE: "THREE",
    },
    output: {
        filename: '[name].js?v=[hash]',
        path: path.resolve(__dirname, projectName + '/dist'),
    }
}