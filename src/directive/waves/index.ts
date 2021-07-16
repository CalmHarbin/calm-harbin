import waves from './waves'
import { PluginObject } from 'vue'
;(waves as any).install = function (Vue: PluginObject<any>) {
    console.log('注册自定义指令waves')
    Vue.directive('waves', waves)
}

console.log(13, waves)
export default waves
