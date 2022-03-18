import loadMore from './loadMore'
import { PluginObject } from 'vue'
;(loadMore as any).install = function (Vue: PluginObject<any>) {
    Vue.directive('loadMore', loadMore)
}

export default loadMore
