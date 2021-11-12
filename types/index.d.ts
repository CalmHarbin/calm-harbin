export { BiuCard } from './biu-card'
export { BiuDialog } from './biu-dialog'
export { BiuDrawer } from './biu-drawer'
export { BiuFormItem } from './biu-form-item'
export { BiuForm } from './biu-form'
export { BiuPage } from './biu-page'
export { BiuTable } from './biu-table'
export { FileUpload } from './file-upload'
export { Operation } from './operation'

import { PluginFunction } from 'vue'

export type objType = {
    [x: string]: any
}

// type写法
// type calmHarbin<T> = {
//     install: PluginFunction<T>
// }

// export const calmHarbin: calmHarbin<any>

// namespace写法
// import { debounce, exportExcel, summary } from '../src/utils/index'

declare namespace calmHarbin {
    export function install<T>(): PluginFunction<T>

    // export const aa: (ops: number) => string
    // export { debounce, exportExcel, summary }

    function debounce(
        fn: (...params: any) => any | void,
        wait?: number,
        throttle?: boolean
    ): (this: any) => void
}

// export = calmHarbin;

// export as namespace 'calm-harbin';

export default calmHarbin

// class写法
// import { debounce, exportExcel, summary } from '../src/utils/index'

// declare namespace CalmHarbin {
//     // declare interface CalmHarbin {
//     export class Base {
//         install: <T>() => PluginFunction<T>
//         debounce
//         exportExcel
//         summary
//     }
//     // export function install<T>(): PluginFunction<T>

//     // export const aa: (ops: number) => string
//     export class Utils {
//         debounce
//         exportExcel
//         summary
//     }
// }

// declare const calmHarbin: CalmHarbin.Base

// export default calmHarbin
