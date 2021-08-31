// import Vue from 'vue'
import ElementUI from 'element-ui' // 全局引入element-ui

// import calmHarbin from '../../lib/calmHarbin.umd.min.js'
import calmHarbin from '@src/index'

import BiuCardDemo from '@test/components/biu-card/biu-card-demo.vue'
import BiuCardFormDemo from '@test/components/biu-card-form/biu-card-form-demo.vue'
import BiuFormItemInput from '@test/components/biu-form-item/biu-form-item-input.vue'
import BiuFormDemo from '@test/components/biu-form/biu-form-demo.vue'
import BiuFormSpan from '@test/components/biu-form/biu-form-span.vue'
import BiuFormBr from '@test/components/biu-form/biu-form-br.vue'
import BiuFormSlot from '@test/components/biu-form/biu-form-slot.vue'
import BiuFormResize from '@test/components/biu-form/biu-form-resize.vue'
import BiuFormDirection from '@test/components/biu-form/biu-form-direction.vue'
import BiuFormElement from '@test/components/biu-form/biu-form-element.vue'
import BiuDialogDemo from '@test/components/biu-dialog/biu-dialog-demo.vue'

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
}: any) => {
    Vue.use(ElementUI)
    // console.log(calmHarbin)
    Vue.use(calmHarbin)

    Vue.component(BiuCardDemo.name, BiuCardDemo)
    Vue.component(BiuCardFormDemo.name, BiuCardFormDemo)
    Vue.component(BiuFormItemInput.name, BiuFormItemInput)
    Vue.component(BiuFormDemo.name, BiuFormDemo)
    Vue.component(BiuFormSpan.name, BiuFormSpan)
    Vue.component(BiuFormBr.name, BiuFormBr)
    Vue.component(BiuFormSlot.name, BiuFormSlot)
    Vue.component(BiuFormResize.name, BiuFormResize)
    Vue.component(BiuFormDirection.name, BiuFormDirection)
    Vue.component(BiuFormElement.name, BiuFormElement)
    Vue.component(BiuDialogDemo.name, BiuDialogDemo)

    // Vue.component('BiuPageTest', BiuPageTest)
    // ...做一些其他的应用级别的优化
    // console.log(Vue, options, router, siteData, isServer)
}
