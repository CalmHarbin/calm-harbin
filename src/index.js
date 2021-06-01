import Button from '../packages/button/index.js'

const components = [Button]

const install = function (Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component)
    })

    Vue.prototype.$hello = () => {
        alert('hello')
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    version: '0.0.1',
    install,
    Button,
}
