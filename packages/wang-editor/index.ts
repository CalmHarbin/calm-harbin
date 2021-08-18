import { PluginObject } from 'vue'
import WangEditor from './src/wang-editor.vue'
;(WangEditor as any).install = function (Vue: PluginObject<any>) {
    Vue.component('WangEditor', WangEditor)
}

export default WangEditor
