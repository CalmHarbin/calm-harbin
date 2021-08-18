import { PluginObject } from 'vue'
import BiuForm from './src/biu-form.vue'
;(BiuForm as any).install = function (Vue: PluginObject<any>) {
    Vue.component('BiuForm', BiuForm)
}

export default BiuForm
