import { PluginObject } from 'vue'
import Pagination from './src/pagination.vue'
;(Pagination as any).install = function (Vue: PluginObject<any>) {
    Vue.component('Pagination', Pagination)
}

export default Pagination
