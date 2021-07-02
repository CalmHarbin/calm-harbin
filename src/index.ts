import Button from '../packages/button/index'

const components = [Button]

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const install = function (Vue: any): void {
    components.forEach((component) => {
        Vue.component(component.name, component)
    })

    Vue.prototype.$hello = () => {
        alert('hello')
    }
}

if (typeof window !== 'undefined' && (window as any).Vue) {
    install((window as any).Vue)
}

export default {
    version: '0.0.1',
    install,
    Button
}
