import { PluginObject } from 'vue'
import BiuSelectTable from './src/biu-select-table.vue'
;(BiuSelectTable as any).install = function (Vue: PluginObject<any>) {
    Vue.component('BiuSelectTable', BiuSelectTable)
}

export default BiuSelectTable
