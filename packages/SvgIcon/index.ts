import { PluginObject } from 'vue'
import CalmFileInput from './src/FileInput.vue'
;(CalmFileInput as any).install = function (Vue: PluginObject<any>) {
    Vue.component('FileInput', CalmFileInput)
}

export default CalmFileInput
