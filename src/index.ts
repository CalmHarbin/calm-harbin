import { Loading } from 'element-ui'

// 将elementui和umyUi的样式打包进来，使用该包的时候就不用再引入了
import 'element-ui/lib/theme-chalk/index.css'
import 'umy-ui/lib/theme-chalk/index.css'
// 引入覆盖elementUi的一些自定义样式
import './styles/elementUi.scss'

// 引入组件
import BiuDialog from '../packages/BiuDialog/index'
import BiuDrawer from '../packages/BiuDrawer/index'
import FileInput from '../packages/FileInput/index'
import BiuCardForm from '../packages/BiuCardForm/index'
import BiuCard from '../packages/BiuCard/index'
import BiuTable from '../packages/BiuTable/index'
import BiuPage from '../packages/BiuPage/index'
import BiuForm from '../packages/BiuForm/index'
import BiuFormItem from '../packages/BiuFormItem/index'
import BiuSelectTable from '../packages/BiuSelectTable/index'

// 引入指令
import waves from './directive/waves/index'

// 引入工具方法
import { debounce, exportExcel } from './utils'

const components = {
    BiuDialog,
    BiuDrawer,
    FileInput,
    BiuCardForm,
    BiuCard,
    BiuTable,
    BiuPage,
    BiuForm,
    BiuFormItem,
    BiuSelectTable
}

const directives = [waves]

const install = function (Vue: any): void {
    directives.forEach((directive) => {
        // console.log(42, directive)
        Vue.use(directive)
    })

    Object.values(components).forEach((component) => {
        // console.log(9, component.name, component)
        // 这里不要用Vue.component方式，打包后component.name会变成n
        // Vue.component(component.name, component)
        Vue.use(component)
    })

    //挂载原型方法及属性
    // Object.keys(prototype).forEach((key: string) => {
    //     console.log(29, '原型', key)

    //     Vue.prototype[key] = (prototype as any)[key]
    // })

    // console.log(51, Vue)

    Vue.use(Loading)
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

export default {
    version: '0.0.5',
    install,
    BiuDialog,
    BiuDrawer,
    FileInput,
    BiuCardForm,
    BiuCard,
    BiuTable,
    BiuPage,
    BiuForm,
    BiuFormItem,
    BiuSelectTable,
    debounce,
    exportExcel
}
