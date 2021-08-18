import { PluginObject } from 'vue'
import Screenfull from './src/screenfull.vue'
;(Screenfull as any).install = function (Vue: PluginObject<any>) {
    Vue.component('Screenfull', Screenfull)
}

export default Screenfull
