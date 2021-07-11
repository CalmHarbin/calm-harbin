import waves from './waves'
import { PluginObject } from 'vue'

const install = (Vue: PluginObject<any>) => {
    Vue.directive('waves', waves)
}

if (window.Vue) {
    ;(window as any).Vue.use(install)
}

;(waves as any).install = install
export default waves
