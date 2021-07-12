/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
    publicPath: './',
    pages: {
        index: {
            entry: 'test/main.ts',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    css: {
        extract: false // 是否单独抽离css
    },
    configureWebpack: {
        output: {
            libraryExport: 'default',
            libraryTarget: 'umd'
        }
    },
    chainWebpack: (config) => {
        config.resolve.alias.set(
            '@packages',
            path.resolve(__dirname, './packages')
        )
        config.resolve.alias.set('@test', path.resolve(__dirname, './test'))
        config.resolve.alias.set('@types', path.resolve(__dirname, './types'))
        config.resolve.alias.set('@src', path.resolve(__dirname, './src'))
    }
}
