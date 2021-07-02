import { PluginObject } from 'vue'
import CalmFileInput from './src/index.vue'
;(CalmFileInput as any).install = function (Vue: PluginObject<any>) {
    Vue.component('FileInput', CalmFileInput)
}

export default CalmFileInput
