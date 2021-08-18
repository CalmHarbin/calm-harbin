import { PluginObject } from 'vue'
import FileInput from './src/file-input.vue'
;(FileInput as any).install = function (Vue: PluginObject<any>) {
    Vue.component('FileInput', FileInput)
}

export default FileInput
