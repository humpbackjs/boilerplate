const path = require('path')

const config = {
  stats: 'minimal',
  entry: {
    entry: path.join(__dirname, '../src/entry'),

    // 组件入口定义
    card: path.join(__dirname, '../src/components/card.tsx'),
    next: path.join(__dirname, '../src/components/next.tsx'),
    top: path.join(__dirname, '../src/components/top.tsx'),
  },
  output: {
    path: path.resolve(__dirname, '../demo/dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    libraryTarget: 'amd',
  },
  target: ['web', 'es5'],
  externals: [
    'react',
    'react-dom/client',
    'react-router-dom',
    '@variousjs/various',
  ],
  mode: 'production',
  devtool: 'source-map',
  resolve: {
    // 必须加上 .js，不然 webpack dev server 会报错找不到模块
    extensions: ['.js', '.ts', '.tsx'],
  },
  devServer: {
    allowedHosts: 'all',
    port: 2333,
    host: '0.0.0.0',
    static: {
      directory: path.join(__dirname, '../demo'),
    },
    // 监听文件构建后重新刷新页面，包括 html 文件
    watchFiles: ['demo'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                localIdentName: '[local]_[hash:base64:5]',
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
}

module.exports = config
