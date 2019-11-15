const path = require('path')

module.exports = {
    mode: 'production',
    entry: './bootstrap.js',
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'index.js'
    }
}
