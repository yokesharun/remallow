const path = require('path');
const webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server/bin/index.js',
  target: 'node',
  externals: [nodeExternals()],
  externalsPresets: {
    node: true // in order to ignore built-in modules like path, fs, etc. 
    },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/server'),
  },
  devServer: {
    static: path.resolve(__dirname, '../dist/server'),
    port: 8081,
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
    }),
  ],
};