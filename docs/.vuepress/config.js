const path = require('path')

module.exports = {
    base: '/calm-harbin/docs/dist/', // 部署到github上
    dest: 'docs/dist',
    title: 'CalmHarbin',
    description: '快速搭建后台页面',
    port: '8888',
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
        logo: '/logo.png',
        //主题配置
        nav: [
            {
                text: '主页',
                link: '/'
            }, // 导航条
            {
                text: '更多',
                ariaLabel: 'Language Menu',
                items: [
                    { text: 'Chinese', link: '/language/chinese/' },
                    { text: 'Japanese', link: '/language/japanese/' }
                ]
            },
            {
                text: 'github',
                link: 'https://github.com/CalmHarbin/calm-harbin'
            }
        ],
        displayAllHeaders: true, // 默认值：false
        // 为以下路由添加侧边栏
        sidebar: [
            {
                title: '快速上手', // 必要的
                // path: '/foo/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 是否可折叠， 默认true,
                children: ['/components/installation', '/components/changelog']
            },
            {
                title: '组件',
                collapsable: false,
                children: [
                    '/components/biu-page',
                    '/components/biu-table',
                    '/components/biu-select-table',
                    '/components/biu-form',
                    '/components/biu-form-item',
                    '/components/biu-tree',
                    '/components/biu-card',
                    '/components/biu-card-form',
                    '/components/biu-dialog',
                    '/components/biu-drawer',
                    '/components/file-upload',
                    '/components/operation'
                    //...
                    // 每加一个菜单需要在这里也新增一下
                ]
            },
            {
                title: '属性/方法',
                collapsable: false,
                children: ['/components/attribute', '/components/methods']
            },
            {
                title: '指令',
                collapsable: false,
                children: ['/components/directive']
            },
            {
                title: '地图相关',
                collapsable: false,
                children: [
                    {
                        title: '百度地图',
                        collapsable: true,
                        children: [
                            {
                                title: '资料汇总',
                                path: 'http://docs.calmharbin.icu/calm-harbin/docs/dist/components/baidu/汇总.html'
                            },
                            {
                                title: '轨迹回放',
                                path: 'http://docs.calmharbin.icu/calm-harbin/docs/dist/components/baidu/路书.html'
                            },
                            {
                                title: '地址搜索',
                                path: 'https://69kg14.csb.app/'
                            },
                            {
                                title: '围栏绘制',
                                path: 'https://oogwx8.csb.app/'
                            },
                            {
                                title: '围栏展示',
                                path: 'http://docs.calmharbin.icu/calm-harbin/docs/dist/components/baidu/围栏展示.html'
                            }
                        ]
                    },
                    {
                        title: 'echarts',
                        collapsable: true,
                        children: [
                            {
                                title: '常见图表',
                                path: 'http://docs.calmharbin.icu/calm-harbin/docs/dist/components/echarts/index.html'
                            }
                        ]
                    },
                    {
                        title: '大屏',
                        collapsable: true,
                        children: [
                            {
                                title: '滚动表格1',
                                path: 'https://pb08u5.csb.app/'
                            },
                            {
                                title: '滚动表格2',
                                path: 'https://zxvqbh.csb.app/'
                            }
                        ]
                    }
                ]
            }
        ],
        smoothScroll: true // 页面滚动
    },
    plugins: [
        [
            'vuepress-plugin-typescript',
            {
                tsLoaderOptions: {
                    // ts-loader 的所有配置项
                    appendTsSuffixTo: [/\.vue$/, /\.md$/]
                }
            }
        ]
    ],
    configureWebpack: {
        externals: {
            xlsx: 'XLSX',
            'decimal.js': 'Decimal',
            dayjs: 'dayjs'
        },
        module: {
            rules: [
                {
                    test: /\.tsx$/,
                    exclude: /node_modules/,
                    use: [
                        'cache-loader',
                        {
                            loader: 'babel-loader',
                            options: {
                                babelrc: false,
                                configFile: false,
                                presets: [
                                    '@babel/preset-env',
                                    '@vue/babel-preset-jsx'
                                ]
                            }
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true,
                                appendTsxSuffixTo: [/\.vue$/, /\.md$/]
                            }
                        }
                    ]
                }
            ]
        }
    },
    chainWebpack: (config) => {
        config.resolve.alias.set(
            '@packages',
            path.resolve(__dirname, '../../packages')
        )
        config.resolve.alias.set('@test', path.resolve(__dirname, '../../test'))
        config.resolve.alias.set(
            '@types',
            path.resolve(__dirname, '../../types')
        )
        config.resolve.alias.set('@src', path.resolve(__dirname, '../../src'))
        // 配置calm-harbin别名,使文档展示用法能和真实用户保持一致。
        config.resolve.alias.set(
            'calm-harbin',
            path.resolve(__dirname, '../../src/index.ts')
        )
        config.resolve.alias.set(
            'calm-harbin/types',
            path.resolve(__dirname, '../../types')
        )

        config.resolve.extensions.merge(['.ts', 'tsx'])

        config.module
            .rule('ts')
            .use('babel-loader')
            .loader('babel-loader')
            .options({
                presets: ['@babel/preset-env']
            })

        config.module
            .rule('js')
            .exclude.add(path.resolve(__dirname, '../../lib'))

        // 文件copy
        config.plugin('copy').use(require('copy-webpack-plugin'), [
            [
                {
                    from: path.resolve(__dirname, './public/'),
                    to: path.resolve(__dirname, '../dist/')
                },
                {
                    from: path.resolve(__dirname, '../../test/views'),
                    to: path.resolve(__dirname, '../dist/components/')
                },
            ]
        ])
    }
}
