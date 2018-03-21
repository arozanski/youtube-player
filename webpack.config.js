const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? "warning" : false
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015']
        }
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.html$/,
      use: [
        {
          loader: "html-loader",
          options: { minimize: true }
        }
      ]
    }]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
