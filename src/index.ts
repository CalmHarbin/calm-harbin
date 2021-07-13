// import { Row, Col, Input, Select, Button, Form, FormItem } from 'element-ui'
import 'element-ui/lib/theme-chalk/icon.css'

import BiuDialog from '../packages/BiuDialog/index'
import FileInput from '../packages/FileInput/index'
import BiuCardForm from '../packages/BiuCardForm/index'
import BiuCard from '../packages/BiuCard/index'
import BiuTable from '../packages/BiuTable/index'

import waves from './directive/waves/index'

import * as prototype from './utils'

console.log(13, prototype)

const components = [BiuDialog, FileInput, BiuCardForm, BiuCard, BiuTable]

const directives = [waves]

const install = function (Vue: any): void {
    components.forEach((component) => {
        console.log(9, component.name, component)
        // 这里不要用Vue.component方式，打包后component.name会变成n
        // Vue.component(component.name, component)
        Vue.use(component)
    })

    directives.forEach((directive) => {
        Vue.use(directive)
    })

    //挂载原型方法及属性
    Object.keys(prototype).forEach((key: string) => {
        console.log(29, '原型', key)
        Vue.prototype[key] = (prototype as any)[key]
    })

    // element-ui组件
    // Vue.use(Row)
    //     .use(Col)
    //     .use(Input)
    //     .use(Select)
    //     .use(Button)
    //     .use(Form)
    //     .use(FormItem)
}

if (typeof window !== 'undefined' && (window as any).Vue) {
    install((window as any).Vue)
}

export { BiuDialog, FileInput, BiuCardForm, BiuCard, BiuTable }

export default {
    version: '0.0.1',
    install,
    BiuDialog,
    FileInput,
    BiuCardForm,
    BiuCard,
    BiuTable
}
