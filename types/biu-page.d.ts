import { CalmComponent } from './component'
import { tableColumnType } from './biu-table'
import { formAttrType } from './biu-form'
import { formTypeType } from './biu-form-item'
import { OperationOptionType } from './operation'
import { objType } from './index'

export type pageColumnsType = {
    /**
     * 表单项的类型
     */
    formType?: formTypeType
    /**
     * 不在表格中显示
     */
    noShow?: boolean
    /**
     * 不在表单中显示
     */
    noSearch?: boolean
    /**
     * 表单的显示排序
     */
    sort?: number
    /**
     * 表单字段id,当表单和表格不一致时配置
     */
    formId?: string
    /**
     * Todo
     * 暂时没有该功能,后面有需要添加
     * 表单项的额外配置
     */
    formAttr?: formAttrType
} & tableColumnType

export type paginationType = {
    page: number
    size: number
    total: number
}

/** BiuPage组件 */
export declare class BiuPage extends CalmComponent {
    /** 操作按钮 */
    operationOptions?: OperationOptionType[]
    /** 表格高度，会自动计算，一般情况下不用传 */
    tbHeight?: number
    /** 数据项，表格和表单共用 */
    columns: pageColumnsType[]
    /** 分页数据 */
    pagination?: paginationType
    /** 值，可使用v-model */
    value: objType
    /** 表单属性 */
    formAttr: objType
    /** 表单事件 */
    formEvent: objType
}
