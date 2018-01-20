const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.join(__dirname, '/src'),
  entry: './app.js',
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/dist/',
    filename: 'dashboard.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new htmlWebpackPlugin({
      template: 'index.html',
      inject: 'body'
    })
  ],
  module: {
    rules: [
      {
        test: /\.tag$/,
        exclude: /node_modules/,
        loader: 'riot-tag-loader',
        enforce: 'pre',
        query: {
          type: 'es6'
        }
      },
      {
        test: /\.(js|tag)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['env']
          }
        }
      },
      {
        test: /\.s[a|c]ss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.(png|jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/, loader: 'url-loader' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ]
  }
}
