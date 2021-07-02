import { PluginObject } from 'vue'
import CalmButton from './src/button.vue'
;(CalmButton as any).install = function (Vue: PluginObject<any>) {
    Vue.component(CalmButton.name, CalmButton)
}

export default CalmButton
