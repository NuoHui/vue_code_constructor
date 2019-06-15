const path = require('path');
const os = require('os');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  // 你想要打包的模块的数组
  entry: {
    vendor: ['vue/dist/vue.min.js', 'vuex', 'axios', 'vue-router']
  },
  output: {
    path: path.join(__dirname, '../static/js'), // 打包后文件输出的位置
    filename: '[name].dll.js',
    library: '[name]_library'
    // vendor.dll.js中暴露出的全局变量名。
    // 主要是给DllPlugin中的name使用，
    // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    // 生成vendor-manifest.json
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname
    })
  ],
  optimization: {
    minimizer: [
      // 压缩JS
      new TerserPlugin({
        cache: true,
        parallel: os.cpus().length,
        sourceMap: true,
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  }
};
