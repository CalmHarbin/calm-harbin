import { PluginObject } from 'vue'
import BiuCardForm from './src/BiuCardForm.vue'
;(BiuCardForm as any).install = function (Vue: PluginObject<any>) {
    Vue.component('BiuCardForm', BiuCardForm)
}

export default BiuCardForm
