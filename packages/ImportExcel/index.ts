import { PluginObject } from 'vue'
import ImportExcel from './src/ImportExcel.vue'
;(ImportExcel as any).install = function (Vue: PluginObject<any>) {
    Vue.component('ImportExcel', ImportExcel)
}

export default ImportExcel
