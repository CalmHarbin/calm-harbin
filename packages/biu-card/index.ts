import { PluginObject } from 'vue'
import BiuCard from './src/biu-card.vue'
;(BiuCard as any).install = function (Vue: PluginObject<any>) {
    Vue.component('BiuCard', BiuCard)
}

export default BiuCard
