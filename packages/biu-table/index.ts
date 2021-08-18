import { PluginObject } from 'vue'
import BiuTable from './src/biu-table.vue'
import Operation from './src/operation.vue'
;(BiuTable as any).install = function (Vue: PluginObject<any>) {
    Vue.component('BiuTable', BiuTable)
    Vue.component('Operation', Operation)
}

export default BiuTable
