import { PluginObject } from 'vue'
import FileUpload from './src/file-upload.vue'
;(FileUpload as any).install = function (Vue: PluginObject<any>) {
    Vue.component('FileUpload', FileUpload)
}

export default FileUpload
