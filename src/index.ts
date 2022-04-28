import { Loading } from 'element-ui'

// 将elementui和umyUi的样式打包进来，使用该包的时候就不用再引入了
import 'element-ui/lib/theme-chalk/index.css'
import 'umy-ui/lib/theme-chalk/index.css'
// 引入覆盖elementUi的一些自定义样式
import './styles/elementUi.scss'

// 引入组件
import BiuDialog from '@packages/biu-dialog/index'
import BiuDrawer from '@packages/biu-drawer/index'
import FileUpload from '@packages/file-upload/index'
import BiuCardForm from '@packages/biu-card-form/index'
import BiuCard from '@packages/biu-card/index'
import BiuTable from '@packages/biu-table/index'
import BiuSelectTable from '@packages/biu-select-table/index'
import BiuPage from '@packages/biu-page/index'
import BiuForm from '@packages/biu-form/index'
import BiuFormItem from '@packages/biu-form-item/index'
import BiuTree from '@packages/biu-tree/index'

// 引入指令
import waves from './directive/waves/index'
import loadMore from './directive/loadMore/index'
import dialogDrag from './directive/dialogDrag/index'
import dialogDragWidth from './directive/dialogDragWidth/index'

// 引入工具方法
import {
    debounce,
    exportExcel,
    exportExcelTemp,
    importExcel,
    summary,
    downLoadFile
} from './utils'
import { startandends } from './utils/date'

// 正则
// export { default as reg } from './utils/regExp.js'
import reg from './utils/regExp.js'

const components = {
    BiuDialog,
    BiuDrawer,
    FileUpload,
    BiuCardForm,
    BiuCard,
    BiuTable,
    BiuPage,
    BiuForm,
    BiuFormItem,
    BiuTree,
    BiuSelectTable
}

const directives = [waves, loadMore, dialogDrag, dialogDragWidth]

const install = function (Vue: any): void {
    directives.forEach((directive) => {
        Vue.use(directive)
    })

    Object.values(components).forEach((component) => {
        // 这里不要用Vue.component方式，打包后component.name会变成n
        // Vue.component(component.name, component)
        Vue.use(component)
    })

    //挂载原型方法及属性
    // Object.keys(prototype).forEach((key: string) => {
    //     Vue.prototype[key] = (prototype as any)[key]
    // })

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

export {
    debounce,
    exportExcel,
    exportExcelTemp,
    importExcel,
    summary,
    downLoadFile,
    startandends,
    reg
}

export default {
    version: '1.0.11',
    install,
    BiuDialog,
    BiuDrawer,
    FileUpload,
    BiuCardForm,
    BiuCard,
    BiuPage,
    BiuTable,
    BiuSelectTable,
    BiuForm,
    BiuFormItem,
    BiuTree,
    debounce,
    exportExcel,
    exportExcelTemp,
    importExcel,
    summary,
    downLoadFile,
    startandends,
    reg
}
