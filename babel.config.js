module.exports = {
    presets: ['@vue/cli-plugin-babel/preset'],
    /**
     * element-ui和umy-ui按需加载
     * 依赖包 babel-plugin-component
     */
    plugins: [
        [
            'component',
            {
                libraryName: 'element-ui',
                styleLibraryName: 'theme-chalk'
            },
            'element-ui'
        ],
        [
            'component',
            {
                libraryName: 'umy-ui',
                styleLibraryName: 'theme-chalk'
            },
            'umy-ui'
        ]
    ]
}
