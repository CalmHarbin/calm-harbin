export { BiuCard } from './biu-card'

import { PluginFunction } from 'vue'

// type calmHarbin<T> = {
//     install: PluginFunction<T>
// }

// export const calmHarbin: calmHarbin<any>

import { debounce, exportExcel, summary } from '../src/utils/index'

declare namespace calmHarbin {
    export function install<T>(): PluginFunction<T>

    // export const aa: (ops: number) => string
    export { debounce, exportExcel, summary }
}

export default calmHarbin
