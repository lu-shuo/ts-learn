const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, '../src/index.ts'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'main.js',
  },
  target: 'web',
  cache: {
    type: 'filesystem', // 持久化缓存
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true,
    }),
  ],
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  stats: 'errors-warnings', // 仅显示错误信息
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../dist'), // This is only necessary if you want to serve static files. static.publicPath will be used to determine where the bundles should be served from and takes precedence.
      publicPath: '/', // Tell the server at which URL to serve static.directory content.
    },
    hot: true,
    host: '0.0.0.0',
    port: 'auto',
    open: true,
    compress: false,
    client: {
      overlay: true, // 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
      progress: true, // 在浏览中展示编译进度
    },
  },
}
