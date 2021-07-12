import { PluginObject } from 'vue'
import BiuTable from './src/BiuTable.vue'
;(BiuTable as any).install = function (Vue: PluginObject<any>) {
    Vue.component('BiuTable', BiuTable)
}

export default BiuTable
