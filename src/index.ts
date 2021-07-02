import Button from '../packages/button/index'
import FileInput from '../packages/FileInput/index'

const components = [Button, FileInput]

const install = function (Vue: any): void {
    components.forEach((component) => {
        console.log(9, component.name, component)
        // Vue.component(component.name, component)
        Vue.use(component)
    })

    Vue.prototype.$hello = () => {
        alert('hello')
    }
}

if (typeof window !== 'undefined' && (window as any).Vue) {
    install((window as any).Vue)
}

export { Button, FileInput }

export default {
    version: '0.0.1',
    install,
    Button,
    FileInput
}
