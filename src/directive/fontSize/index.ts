import fontSize from './fontSize'
import { PluginObject } from 'vue'
;(fontSize as any).install = function (Vue: PluginObject<any>) {
    Vue.directive('fontSize', fontSize)
}

export default fontSize
