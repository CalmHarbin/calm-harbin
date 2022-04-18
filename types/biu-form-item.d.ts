import { CalmComponent } from './component'

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

/** BiuFormItem组件 */
export declare class BiuFormItem extends CalmComponent {
    /** 表单类型 */
    formType: formTypeType
    /** 值，可使用v-model */
    value: any
}
