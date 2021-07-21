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
        // 外部扩展不打包
        externals:
            process.env.NODE_ENV === 'production'
                ? {
                      xlsx: {
                          commonjs: 'xlsx',
                          amd: 'xlsx',
                          commonjs2: 'xlsx',
                          // 这里当使用script模式引入是，该模块指向的全局变量
                          root: 'XLSX'
                      },
                      'element-ui': {
                          commonjs: 'element-ui',
                          amd: 'element-ui',
                          commonjs2: 'element-ui',
                          root: 'ELEMENT'
                      },
                      'umy-ui': {
                          commonjs: 'umy-ui',
                          amd: 'umy-ui',
                          commonjs2: 'umy-ui',
                          root: 'UMYUI'
                      },
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
