/**
 * 可选表单项类型
 */
export type formTypeType =
    | 'text' // 显示文本
    | 'input'
    | 'select'
    | 'date'
    | 'timeSelect'
    | 'timerange' // 时间范围选择
    | 'area'
    | 'treeSelect'
    | 'slot'

/* 省市区组件可选类型 */
export type areaType = 'province' | 'city' | 'area'

/** 树组件数据源 */
export type treeNodeType = {
    label: string
    id: string
    pid?: string
    children?: treeNodeType[]
}
