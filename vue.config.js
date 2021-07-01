const path = require('path')

module.exports = {
    pages: {
        index: {
            entry: 'test/main.ts',
            template: 'public/index.html',
            filename: 'index.html',
        },
    },
    css: {
        extract: false, // 是否单独抽离css
    },
    configureWebpack: {
        output: {
            library: 'calmHarbin', // umd的全局访问变量，打包lib的时候最好通过--name 设置，确保和文件的一致性
            libraryExport: 'default',
        },
    },
    chainWebpack: config => {
        config.resolve.alias.set(
            '@packages',
            path.resolve(__dirname, './packages')
        )
    },
}
