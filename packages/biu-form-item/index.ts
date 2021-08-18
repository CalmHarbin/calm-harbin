import { PluginObject } from 'vue'
import BiuFormItem from './src/biu-form-item.vue'
;(BiuFormItem as any).install = function (Vue: PluginObject<any>) {
    Vue.component('BiuFormItem', BiuFormItem)
}

export default BiuFormItem
