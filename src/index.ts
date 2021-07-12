import BiuDialog from '../packages/BiuDialog/index'
import FileInput from '../packages/FileInput/index'
import BiuCardForm from '../packages/BiuCardForm/index'
import BiuCard from '../packages/BiuCard/index'

import waves from './directive/waves/index'

import { $_debounce } from './utils'

const components = [BiuDialog, FileInput, BiuCardForm, BiuCard]

const directives = [waves]

const utils = [$_debounce]

const install = function (Vue: any): void {
    components.forEach((component) => {
        console.log(9, component.name, component)
        // Vue.component(component.name, component)
        Vue.use(component)
    })

    directives.forEach((directive) => {
        Vue.use(directive)
    })

    utils.forEach((util) => {
        Vue.prototype[util.name] = util
    })

    Vue.prototype.$hello = () => {
        alert('hello')
    }
}

if (typeof window !== 'undefined' && (window as any).Vue) {
    install((window as any).Vue)
}

export { BiuDialog, FileInput, BiuCardForm, BiuCard }

export default {
    version: '0.0.1',
    install,
    BiuDialog,
    FileInput,
    BiuCardForm,
    BiuCard
}
