const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const config = require('../config/default_env');
module.exports = {
  entry: path.resolve(__dirname, '../src/main.js'),
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      components: path.resolve(__dirname, '../src/components'),
      api: path.resolve(__dirname, '../src/api'),
      modules: path.resolve(__dirname, '../src/modules'),
      router: path.resolve(__dirname, '../src/router'),
      store: path.resolve(__dirname, '../src/store'),
      styles: path.resolve(__dirname, '../src/styles'),
      filters: path.resolve(__dirname, '../src/filters'),
      directives: path.resolve(__dirname, '../src/directives'),
      vue: path.resolve(__dirname, '../node_modules/vue/dist/vue.min.js')
    },
    // 指明第三方模块的绝对路径, 减少路径查找
    modules: [path.resolve(__dirname, '../node_modules')]
  },
  externals: [],
  module: {
    // 忽略对没采用模块化的模块进行递归解析
    noParse: [/vue\.min\.js/],
    rules: [
      // 处理js
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, 'src'), // 缩小命中范围
        use: [
          {
            loader: 'babel-loader?cacheDirectory' // 通过cacheDirectory选项开启支持缓存
          },
          {
            loader: 'eslint-loader',
            options: {
              fix: true
            }
          }
        ]
      },
      // 处理字体
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 文件大小小于limit参数，url-loader将会把文件转为base64 URL
          limit: 10000,
          name: '[name]-[hash:5].[ext]',
          output: 'fonts/'
          // publicPath: '', 多用于CDN
        }
      },
      // 处理图像
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          // 转base64
          {
            loader: 'url-loader',
            options: {
              // 具体配置见插件官网
              limit: 10000,
              name: '[name]-[hash:5].[ext]',
              outputPath: 'img/' // outputPath所设置的路径，是相对于 webpack 的输出目录。
              // publicPath 选项则被许多webpack的插件用于在生产模式下更新内嵌到css、html文件内的 url , 如CDN地址
            }
          },
          {
            loader: 'image-webpack-loader', // 压缩图像
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                sass: [
                  'style-loader',
                  'css-loader',
                  'sass-loader',
                  'postcss-loader'
                ]
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 清空目录
    new CleanWebpackPlugin(),
    // 打包生成html
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      cache: true,
      chunksSortMode: 'none',
      title: config.title, // 可以由外面传入
      filename: 'index.html', // 默认index.html
      template: path.resolve(__dirname, '../index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    }),
    new VueLoaderPlugin()
  ]
};
