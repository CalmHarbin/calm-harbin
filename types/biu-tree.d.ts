import { CalmComponent } from './component'

/** 树组件数据源 */
export type treeNodeType = {
    label: string
    id: string
    pid?: string
    children?: treeNodeType[]
}

/** BiuCard组件 */
export declare class BiuTree extends CalmComponent {
    /** 是否多选，默认false */
    multiple?: boolean
    /** 多选时是否含下级，默认false */
    subWith?: boolean
    /** 单选时是否只能选中最底层，默认false */
    substrate?: boolean
    /** 数据，跟elementui格式一致 */
    data?: treeNodeType[]
}
