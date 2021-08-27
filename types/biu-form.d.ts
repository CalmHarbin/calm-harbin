import { VNode } from 'vue'
import { DatePickerType } from 'element-ui/types/date-picker'
import { CalmComponent } from './component'
import { areaType, formTypeType } from './biu-form-item'

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
     * 机构树选择是由有默认值,筛选条件通常有默认值
     * @tip 仅支持含下级时使用
     */
    defaultValue?: boolean
    /**
     * 机构树是否查询所有的机构，false时查询自己含下级数据，默认false
     */
    whole?: boolean
    /**
     * 下拉菜单显示清空图标 默认true
     */
    clearable?: boolean
    /**
     * 自定义渲染，注意该配置必须写在 @Component中，不然会报错
     */
    // eslint-disable-next-line no-undef
    render?: (h: any, scope: formAttrType) => VNode
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

/** BiuForm组件 */
export declare class BiuForm extends CalmComponent {
    /** 标题 */
    source: BiuformType[]
}

/** 表单展示方式：vertical垂直展示，horizontal水平展示 */
export type directionType = 'vertical' | 'horizontal'
