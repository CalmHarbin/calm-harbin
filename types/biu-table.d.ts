import { VNode } from 'vue'
import { formAttrType } from './biu-form'
import { CalmComponent } from './component'
import { objType } from './index'

type scopeType = {
    row: any
    col?: any
    $index: number
}

/**
 * 表格每一项的配置
 */
export type tableColumnType = {
    /**
     * 表格显示取值字段
     */
    id: string
    /**
     * 表头
     */
    label: string
    /**
     * 宽度
     */
    width?: number
    /**
     * 可编辑单元格
     */
    editable?: boolean
    /**
     * 是否显示表头的筛选功能，若为true，请务必使用v-model绑定数据
     */
    showHeaderFilter?: boolean
    /**
     * 可编辑时的自定义渲染
     */
    editRender?: (h: any, scope: scopeType) => VNode
    /**
     *
     * 针对时间格式转化显示: 时间戳转格式
     *
     * 现在接口统一返回的时间戳,表格中显示需要转化,
     *
     * 比如显示 2020-10-16 16:00:00 则 配置 timeFormat: 'YYYY-MM-DD HH:mm:ss'
     *
     * // 详情配置值参考 day.js的format方法
     * @url https://dayjs.fenxianglu.cn/category/display.html#%E6%A0%BC%E5%BC%8F%E5%8C%96
     */
    timeFormat?: string
    /**
     * 自定义渲染，注意该配置必须写在 @Component中，不然会报错
     * 还可以使用slot来自定义渲染，name=id 推荐使用。
     */
    render?: (h: any, scope: scopeType) => VNode
    /**
     * 表头自定义渲染
     */
    headRender?: (h: any, col: tableColumnType) => VNode

    /** 列头显示红丝，表示必填，可通过类 calm-BiuTable-required 修改样式 */
    required?: boolean

    /** 表头的表单项配置 */
    formAttr?: formAttrType

    /** 合并列表-分组别名 */
    groupAnotherName?: string

    [x: string]: any
}

export type expandRenderPropType = {
    row: objType
    $index: number
}

export type expandRenderType = (h, scoped: expandRenderPropType) => VNode

/**
 * 表格右侧操作按钮的配置
 */
export type tablePostfixOptionsType = {
    /** 按钮名字 */
    title: string | ((scope: scopeType) => string)
    /**
     * 图标
     * @url https://element.eleme.io/#/zh-CN/component/icon
     */
    icon: string | ((scope: scopeType) => string)
    /**
     * 隐藏按钮
     */
    hidden?: boolean
    /**
     * 是否禁用，可用于根据数据来判断该功能是否禁用
     */
    disabled?: (scope: scopeType) => boolean
    /**
     * 禁用时的提示语，不传默认展示title
     */
    message?: string | ((scope: scopeType) => string)
    /**
     * 点击事件
     */
    callback: (scope: scopeType) => void
}

/** BiuCard组件 */
export declare class BiuTable extends CalmComponent {
    /** 每一行的唯一标识，默认为id */
    rowId?: string
    /** 是否处于loading状态，默认false */
    loading?: boolean
    /** 表格的固定高度，不传则不限制高度 */
    tbHeight?: boolean
    /** 是不是虚拟表格，默认true */
    virtual?: boolean

    /** 表格列的配置 */
    columns?: tableColumnType[]
    /** 表格数据源 */
    tableData?: objType[]
    /** 右侧操作列配置 */
    tablePostfixOptions?: tablePostfixOptionsType[]

    /** 是否显示多选，默认false */
    selection?: boolean
    /** 表格多选，勾选的数据，支持sync用法 */
    multipleSelection?: boolean

    /** 是否为可编辑表格，默认false */
    editable?: boolean
    // /** 是否显示新增/删除一行操作列，默认false，仅editable=true生效, 同时会传入给 el-table-column*/
    editAction?: objType
    /** 可编辑表格时，插入一行的数据 */
    plus?: (data: objType) => objType

    /** 是否显示表头的筛选功能，默认false */
    showHeaderFilter?: boolean
    /** 是否显示汇总，需要自行计算汇总数据放入tableData最后一项，默认false */
    showSummary?: boolean
    /** 自定义展开内容， */
    expandRender?: ({ row, $index }: expandRenderPropType) => VNode
}
