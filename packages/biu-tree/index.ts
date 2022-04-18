import { PluginObject } from 'vue'
import BiuTree from './src/biu-tree.vue'
;(BiuTree as any).install = function (Vue: PluginObject<any>) {
    Vue.component('BiuTree', BiuTree)
}

export default BiuTree
