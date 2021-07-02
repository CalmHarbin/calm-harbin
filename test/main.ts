import Vue from 'vue'
import App from './App.vue'
import CalmHarbin, { Button } from '../src'

Vue.config.productionTip = false

console.log(7, CalmHarbin, Button)

Vue.use(CalmHarbin)

new Vue({
    render: (h) => h(App)
}).$mount('#app')
