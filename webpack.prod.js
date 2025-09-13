const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'public/assets'), to: 'assets' },
        // ✅ Copy root-level JSON files (like cars.json, fare-rules.json)
        { from: path.resolve(__dirname, 'public/cars.json'), to: 'cars.json' },
        { from: path.resolve(__dirname, 'public/fare-rules.json'), to: 'fare-rules.json' },

      ],
    }),
  ],
});
