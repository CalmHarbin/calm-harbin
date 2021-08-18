import { PluginObject } from 'vue'
import BiuDialog from './src/biu-dialog.vue'
;(BiuDialog as any).install = function (Vue: PluginObject<any>) {
    Vue.component('BiuDialog', BiuDialog)
}

export default BiuDialog
