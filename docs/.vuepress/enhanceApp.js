// import Vue from 'vue'
// import ElementUI from 'element-ui' // 全局引入element-ui
// import 'element-ui/lib/theme-chalk/index.css'

import BiuPageTest from '@test/components/BiuPageTest.vue'

console.log(BiuPageTest)

// import BiuPageTest from '../../test/components/BiuPageTest'

// import hljs from 'highlight.js' // 代码高亮
// import 'highlight.js/styles/googlecode.css'

// // 全局注册指令
// Vue.directive('highlight', function (el) {
//     let blocks = el.querySelectorAll('pre code')
//     blocks.forEach((block) => {
//         hljs.highlightBlock(block)
//     })
// })

// 使用异步函数也是可以的
export default ({
    Vue, // VuePress 正在使用的 Vue 构造函数
    options, // 附加到根实例的一些选项
    router, // 当前应用的路由实例
    siteData, // 站点元数据
    isServer // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
    Vue.component('BiuPageTest', BiuPageTest)
    // Vue.use(ElementUI)
    // console.log(calmHarbin)
    // Vue.use(calmHarbin)
    // ...做一些其他的应用级别的优化
    console.log(Vue, options, router, siteData, isServer)
}
