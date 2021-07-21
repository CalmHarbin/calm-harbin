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
    editRender?: (h: any, scope: any) => JSX.Element | Element
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
    render?: (h: any, scope: any) => JSX.Element | Element

    [x: string]: any
}

type scopeType = {
    row: any
    $index: number
}

export type tablePostfixOptionsType = {
    title: string | ((scope: scopeType) => string)
    /**
     * 隐藏按钮
     */
    hidden?: boolean
    /**
     * 是否禁用，可用于根据数据来判断该功能是否禁用
     */
    disabled?: (scope: scopeType) => boolean
    /**
     * 图标
     * @url https://element.eleme.io/#/zh-CN/component/icon
     */
    icon: string | ((scope: scopeType) => string)
    /**
     * 点击事件
     */
    onLinkClick: (scope: scopeType) => void // 值见element table的自定义单元格的slot-scope
}