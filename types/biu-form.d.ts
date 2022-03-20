import { VNode } from 'vue'
import { DatePickerType } from 'element-ui/types/date-picker'
import { ValidateCallback, ValidateFieldCallback } from 'element-ui/types/form'
import { CalmComponent } from './component'
import { areaType, formTypeType, treeNodeType } from './biu-form-item'
import { pageColumnsType } from './biu-page'

type objType = {
    [x: string]: any
}

export type formAttrType = {
    /**
     * label的宽度
     */
    labelWidth?: number
    /**
     * 提示语
     */
    placeholder?: string
    /**
     * 表单项占据的大小, 默认6
     */
    span?: number
    /**
     * 该项之后是否换行
     */
    br?: boolean
    /**
     * 省市区组件的类型
     */
    areaType?: areaType
    /**
     * 日期组件的类型
     */
    dateType?: DatePickerType
    /**
     * 字典组件:字典类型
     */
    dicType?: string
    /**
     * 下拉框的选项，formType='select'时必填
     */
    options?: {
        label: string
        value: string | number
    }[]
    /**
     * 多选
     */
    multiple?: boolean
    /**
     * 机构树选择含下级，true显示含下级
     */
    subWith?: boolean
    /**
     * 树选择组件
     * 是否只能选中最底层,配置该项时,选中项只能是最底层的。
     * 只针对单选有效，开启后点击文本是展开/收起，未开启点击文本是选中
     */
    substrate?: boolean
    /**
     * 树选择组件
     * 数据源
     */
    data?: treeNodeType[]
    /**
     * 下拉菜单显示清空图标 默认true
     */
    clearable?: boolean
    /**
     * 自定义渲染，注意该配置必须写在 @Component中，不然会报错
     * pageColumnsType类型 为 使用BiuTable组件时
     * BiuformType类型 为 使用BiuForm组件时
     */
    render?: (h: any, scope: pageColumnsType | BiuformType) => VNode
    /**
     * 字段
     */
    hidden?: boolean
    [x: string]: any
}

export type BiuformType = {
    /**
     * 表单类型
     */
    formType: formTypeType
    /**
     * 字段
     */
    id: string
    /**
     * 提示
     */
    label?: string
} & formAttrType

/** 表单展示方式：vertical垂直展示，horizontal水平展示 */
export type directionType = 'vertical' | 'horizontal'

/** BiuForm组件 */
export declare class BiuForm extends CalmComponent {
    /** 绑定值 */
    value: objType

    /** 标题 */
    source: BiuformType[]

    /** 是否显示搜索按钮 */
    showBtn?: boolean

    /** 表单项排列方向 */
    direction?: directionType

    /**
     * 是否自适应表单项的宽度，默认true，
     * 表单一行可放置数量为1~6个。默认4个，可以配置min来控制最小宽度。
     */
    resize?: boolean

    /** 表单项的最小宽度，默认280，最大宽度=(min * 3) / 2 */
    min?: number

    /** 对表单进行校验 */
    validate: ((callback: ValidateCallback) => void) | (() => Promise<boolean>)

    /** 对部分表单字段进行校验的方法 */
    validateField: (
        props: string | string[],
        callback?: ValidateFieldCallback
    ) => void

    /** 对整个表单进行重置到初始值，并移除校验结果 */
    resetFields: () => void

    /** 移除表单项的校验结果 */
    clearValidate: (props?: string | string[]) => void
}
