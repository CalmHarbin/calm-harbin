import dialogDragWidth from './dialogDragWidth'
import { PluginObject } from 'vue'
;(dialogDragWidth as any).install = function (Vue: PluginObject<any>) {
    Vue.directive('dialogDragWidth', dialogDragWidth)
}

export default dialogDragWidth
