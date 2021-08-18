import { PluginObject } from 'vue'
import BiuPage from './src/biu-page.vue'
;(BiuPage as any).install = function (Vue: PluginObject<any>) {
    Vue.component('BiuPage', BiuPage)
}

export default BiuPage
