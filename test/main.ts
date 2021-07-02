import Vue from 'vue'
import App from './App.vue'
import CalmButton from '../src'

Vue.config.productionTip = false

Vue.use(CalmButton)

new Vue({
    render: (h) => h(App)
}).$mount('#app')
