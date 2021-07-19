/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

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
        extract: process.env.NODE_ENV === 'production' // 是否单独抽离css
    },
    configureWebpack: {
        output: {
            libraryExport: 'default',
            libraryTarget: 'umd'
        },
        externals:
            process.env.NODE_ENV === 'production'
                ? {
                      xlsx: 'xlsx',
                      'element-ui': 'element-ui',
                      'umy-ui': 'umy-ui',
                      dayjs: 'dayjs'
                  }
                : undefined
    },
    chainWebpack: (config) => {
        config.resolve.alias.set(
            '@packages',
            path.resolve(__dirname, './packages')
        )
        config.resolve.alias.set('@test', path.resolve(__dirname, './test'))
        config.resolve.alias.set('@types', path.resolve(__dirname, './types'))
        config.resolve.alias.set('@src', path.resolve(__dirname, './src'))

        /** lodash按需加载, 有问题,不用了 */
        // 依赖包 lodash-webpack-plugin babel-plugin-lodash
        // config.plugin('loadshReplace').use(new LodashModuleReplacementPlugin())

        // config.module
        //     .rule('ts')
        //     .use('babel-loader')
        //     .tap((options) => ({
        //         ...options,
        //         plugins: ['lodash']
        //     }))

        // config.module
        //     .rule('js')
        //     .use('babel-loader')
        //     .tap((options) => ({
        //         ...options,
        //         plugins: ['lodash']
        //     }))
        /** lodash按需加载 */
    }
}
