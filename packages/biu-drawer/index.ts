import { PluginObject } from 'vue'
import BiuDrawer from './src/biu-drawer.vue'
;(BiuDrawer as any).install = function (Vue: PluginObject<any>) {
    Vue.component('BiuDrawer', BiuDrawer)
}

export default BiuDrawer
