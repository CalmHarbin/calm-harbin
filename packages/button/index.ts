import CalmButton from './src/button.vue'

CalmButton.install = function(Vue: any) {
    Vue.component(CalmButton.name, CalmButton)
}

export default CalmButton
