import Button from '../packages/button/index'

const components = [Button]

const install = function(Vue: any, opts = {}) {
    console.log(6, Vue)
    components.forEach(component => {
        Vue.component(component.name, component)
    })

    console.log(Vue)

    Vue.config.globalProperties.$hello = () => {
        alert('hello')
    }
}

if (typeof window !== 'undefined' && (window as any).Vue) {
    install((window as any).Vue)
}

export default {
    version: '0.0.1',
    install,
    Button,
}
