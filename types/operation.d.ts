import { VNode } from 'vue'
import { ButtonType } from 'element-ui/types/button'
import { CalmComponent } from './component'

export type OperationOptionType = {
    title?: string
    /**
     * 这里有两个参数,第一个为发送请求的参数, 第二个为格式化后接口返回的数据
     */
    callback?: (btn: OperationOptionType) => void
    type?: ButtonType | 'default'
    // eslint-disable-next-line no-undef
    render?: () => VNode
    /**
     * 隐藏按钮
     */
    hidden?: boolean
    /**
     * 禁用按钮
     */
    disabled?: boolean | (() => boolean)
    /**
     * 禁用时提示语
     */
    message?: string | (() => string | undefined)
    /**
     * 按钮loading
     */
    loading?: boolean
    /**
     * 传入给按钮的额外属性,参考
     */
    btnProps?: any
}

/** BiuCard组件 */
export declare class Operation extends CalmComponent {
    /** 按钮配置 */
    operationOptions: OperationOptionType[]
}
