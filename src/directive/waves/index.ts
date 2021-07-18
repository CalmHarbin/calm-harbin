import waves from './waves'
import { PluginObject } from 'vue'
;(waves as any).install = function (Vue: PluginObject<any>) {
    Vue.directive('waves', waves)
}

export default waves
