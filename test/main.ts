import Vue from 'vue'

import App from './App.vue'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import CalmHarbin from '../src'

Vue.config.productionTip = false

console.log(7, CalmHarbin)

Vue.use(Element, {
    size: 'medium' // set element-ui default size
})

Vue.use(CalmHarbin)

new Vue({
    render: (h) => h(App)
}).$mount('#app')
