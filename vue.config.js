/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const CDN_CSS = [
    // 'https://cdn.jsdelivr.net/npm/calm-harbin@0.2.3-pre/lib/calmHarbin.css'
]
const CDN_JS = [
    'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js',
    'https://cdn.jsdelivr.net/npm/xlsx@0.17.0/dist/xlsx.min.js',
    'https://lib.baomitu.com/element-ui/2.13.2/index.js',
    'https://cdn.jsdelivr.net/npm/umy-ui@1.1.6/lib/index.js',
    'https://cdn.jsdelivr.net/npm/decimal.js@10.2.0/decimal.min.js',
    'https://cdn.jsdelivr.net/npm/dayjs@1.10.4/dayjs.min.js'
]

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
                ? process.argv.includes('lib')
                    ? {
                          xlsx: {
                              commonjs: 'xlsx',
                              amd: 'xlsx',
                              commonjs2: 'xlsx',
                              // 这里当使用script模式引入时，该模块指向的全局变量
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
                          'decimal.js': {
                              commonjs: 'decimal.js',
                              amd: 'decimal.js',
                              commonjs2: 'decimal.js',
                              root: 'Decimal'
                          },
                          dayjs: 'dayjs',
                          vue: 'Vue'
                      }
                    : {
                          vue: 'Vue',
                          xlsx: 'XLSX',
                          'element-ui': 'ELEMENT',
                          'umy-ui': 'UMYUI',
                          'decimal.js': 'Decimal',
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
        config.resolve.alias.set('@src', path.resolve(__dirname, './src'))

        // app模式使用cdn
        if (
            process.env.NODE_ENV === 'production' &&
            !process.argv.includes('lib')
        ) {
            config
                .plugin('html-index') // 上面pages配置了index，所以是html-index
                .tap((args) => {
                    args[0].CDN_CSS = CDN_CSS
                    args[0].CDN_JS = CDN_JS
                    return args
                })
                .end()
        }

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

        // stylelint配置
        config.plugin('stylelint').use(StyleLintPlugin, [
            {
                files: ['**/*.{html,vue,css,sass,scss}'],
                fix: true, // 自动修复
                cache: true,
                emitError: true,
                failOnError: false
            }
        ])
    },
    devServer: {
        //请求代理
        proxy: {
            '/dev': {
                target: 'https://nhgw-test.czdtd.com/edi/nhfd/in',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/dev': ''
                }
            }
        },
        disableHostCheck: true
        // open: true, //自动打开浏览器
        // host: 'localhost', //主机
        // port: 8080 //端口
        // https: false,
        // hotOnly: false,
    }
}
