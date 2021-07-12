import { PluginObject } from 'vue'
import BiuDrawer from './src/BiuDrawer.vue'
;(BiuDrawer as any).install = function (Vue: PluginObject<any>) {
    Vue.component('BiuDrawer', BiuDrawer)
}

export default BiuDrawer
