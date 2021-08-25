const path = require('path')

module.exports = {
    base: '/',
    dest: 'docs/dist',
    title: 'CalmHarbin',
    description: '快速搭建后台页面',
    port: '8888',
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
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
        sidebar: {
            '/components/': [
                {
                    title: '开发指南', // 必要的
                    // path: '/foo/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 是否可折叠， 默认true,
                    sidebarDepth: 1, // 可选的, 默认值是 1
                    children: ['/']
                },
                {
                    title: '组件',
                    collapsable: false,
                    children: [
                        'button',
                        'biu-card'
                        //...
                        // 每加一个菜单需要在这里也新增一下
                    ]
                }
            ]
        },
        lastUpdated: 'Last Updated', // 文件最后更新时间
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

        // config.module
        //     .rule('vue')
        //     // .include([path.resolve(__dirname, '../')])
        //     .use('babel-loader')
        //     .loader('babel-loader')
        //     .options({
        //         presets: ['@babel/preset-env']
        //     })
    }
}
