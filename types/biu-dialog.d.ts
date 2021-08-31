import { CalmComponent } from './component'
import { OperationOptionType } from './operation'

/** BiuDialog组件 */
export declare class BiuDialog extends CalmComponent {
    /** 标题 */
    title?: string
    /** 是否显示弹框，可使用.sync修饰符 */
    visible: string
    /** 所有的按钮是否处于loading状态 */
    btnLoading?: boolean
    /** 按钮配置 */
    footer?: OperationOptionType[] | boolean
}
