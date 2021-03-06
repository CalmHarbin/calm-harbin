export { BiuDialog } from './biu-dialog'
export { BiuDrawer } from './biu-drawer'
export { FileUpload } from './file-upload'
export { BiuCard } from './biu-card'
export { BiuPage } from './biu-page'
export { BiuTable } from './biu-table'
export { BiuForm } from './biu-form'
export { BiuFormItem } from './biu-form-item'
export { BiuTree } from './biu-tree'

import { PluginFunction } from 'vue'

import {
    regExp,
    debounceType,
    exportExcelType,
    exportExcelTempType,
    importExcelType,
    summaryType
} from './utils'

export type objType = {
    [x: string]: any
}

/** 版本号 */
export const version: string
/** Vue.use使用 */
export function install<T>(): PluginFunction<T>

export const reg: regExp

export const debounce: debounceType

export const exportExcel: exportExcelType

export const exportExcelTemp: exportExcelTempType

export const importExcel: importExcelType

export const summary: summaryType

export const startandends: startandendsType
