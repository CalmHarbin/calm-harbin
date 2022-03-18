import dialogDrag from './dialogDrag'
import { PluginObject } from 'vue'
;(dialogDrag as any).install = function (Vue: PluginObject<any>) {
    Vue.directive('dialogDrag', dialogDrag)
}

export default dialogDrag
