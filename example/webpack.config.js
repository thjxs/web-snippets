const path = require('path');

module.exports = [
  {
    mode: 'production',
    entry: './bootstrap.js',
    output: {
      path: path.resolve(__dirname, './'),
      filename: 'index.js',
    },
  },
  {
    mode: 'production',
    entry: './src/random.js',
    output: {
      path: path.resolve(__dirname, './'),
      filename: 'random.js',
    },
  },
];
