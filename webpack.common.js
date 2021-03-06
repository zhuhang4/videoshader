const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const merge = require("webpack-merge");
const program = require('commander');
const fs = require('fs');

let projectName = './';
let argv;
try {
  // 通过 npm run dev 的方法执行的时候，参数更换获取方式
  argv = JSON.parse(process.env.npm_config_argv).original;
  program
    .version('0.1.0')
    .option('-d, --dirname <dirname>', '编译目录')
    .option('-s, --svnname <svnname>', 'svn目录') //不写会报错
    .option('-p, --port <port>', '端口')
    .parse(argv);

} catch (e) {
  argv = process.argv;
}
if (program.port) {
  global.port = program.port;
} else {
  global.port = 3000;
  console.log('使用默认3000端口');
}
if (!fs.existsSync(path.resolve(__dirname, `./${program.dirname}`))) {
  global.projectName = projectName;
  console.log(`./${program.dirname}`, `项目不存在,请传npm run xx --dirname=xxx ---------------------,当前使用默认项目${projectName}`);
} else {
  projectName = global.projectName = './' + program.dirname;
}




const parts = require(projectName + "/webpack.local.js");
const config = {
  entry: {
    main: projectName + '/src/Main.js',
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.ttf|eot|svg|woff|woff2$/,
        use: 'url-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(gif|png|jpe?g|svg|webp)$/i,
        use: [{
            loader: 'url-loader',
            options: {
              name: '[name].[ext]?v=[hash:7]',
              limit: 10240,
              outputPath: './assets/images/',
              publicPath: './assets/images/',
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {

              mozjpeg: {
                progressive: true,
                quality: 100
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
            }
          },
        ],
      },

    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.ExtendedAPIPlugin(),
    new CleanWebpackPlugin([projectName + '/dist'],
      // {exclude:['assets','lib']}
    ),
    new webpack.NamedModulesPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      MINI: JSON.stringify(true),
    })
    // new webpack.HotModuleReplacementPlugin()
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'initial',
          priority: 2,
          minChunks: 2,
        }
      }
    }
  },

  output: {
    filename: '[name].js?v=[hash]',
    path: path.resolve(__dirname, projectName + '/dist'),
    // library: 'library',
    /*
     umd 通用配置，这样可以通过 es6 amd cmd 方式使用库
     libraryTarget 属性有多中配置，具体可以看webpack官网 指南 -> 创建library
    */
    //  libraryTarget: 'commonjs',
  }
};

module.exports = merge([
  config,
  parts
]);