import BiuDialog from '../packages/BiuDialog/index'
import FileInput from '../packages/FileInput/index'

import waves from './directive/waves/index'

const components = [BiuDialog, FileInput]

const directives = [waves]

const install = function (Vue: any): void {
    components.forEach((component) => {
        console.log(9, component.name, component)
        // Vue.component(component.name, component)
        Vue.use(component)
    })

    directives.forEach((directive) => {
        Vue.use(directive)
    })

    Vue.prototype.$hello = () => {
        alert('hello')
    }
}

if (typeof window !== 'undefined' && (window as any).Vue) {
    install((window as any).Vue)
}

export { BiuDialog, FileInput }

export default {
    version: '0.0.1',
    install,
    BiuDialog,
    FileInput
}
