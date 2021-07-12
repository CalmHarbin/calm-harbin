import { PluginObject } from 'vue'
import Pagination from './src/Pagination.vue'
;(Pagination as any).install = function (Vue: PluginObject<any>) {
    Vue.component('Pagination', Pagination)
}

export default Pagination
