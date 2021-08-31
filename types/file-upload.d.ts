import { CalmComponent } from './component'

/** BiuCard组件 */
export declare class FileUpload extends CalmComponent {
    /** 上传文件类型 */
    accept: string | undefined
    /** 是否禁用 */
    disabled?: boolean | undefined

    /** 改变事件 */
    change: (e: any) => void
    /** 选择文件后的回调 */
    importFile: (files: any) => void
}
