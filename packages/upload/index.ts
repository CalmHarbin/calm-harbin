import { PluginObject } from 'vue'
import Upload from './src/upload.vue'
;(Upload as any).install = function (Vue: PluginObject<any>) {
    Vue.component('Upload', Upload)
}

export default Upload
