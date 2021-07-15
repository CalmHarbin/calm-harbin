import Vue from 'vue'

import App from './App.vue'

// import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// import UmyUi from 'umy-ui'
// import 'umy-ui/lib/theme-chalk/index.css' // 引入样式

import CalmHarbin, { debounce } from '../src'

Vue.config.productionTip = false

console.log(7, CalmHarbin, debounce)

// Vue.use(Element, {
//     size: 'medium' // set element-ui default size
// })

// Vue.use(UmyUi)

Vue.use(CalmHarbin)

new Vue({
    render: (h) => h(App)
}).$mount('#app')
