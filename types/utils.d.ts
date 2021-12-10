import { objType } from './index'
import { tableColumnType } from './biu-table'

export interface regExp {
    phoneReg: RegExp
    landline: RegExp
    phoneOrladline: RegExp
    email: RegExp
    bankCardNo: RegExp
    idNumber: RegExp
    passport: RegExp
    chinese: RegExp
    postCode: RegExp
}
/**
 * 函数节流:当连续触发函数时,函数在n秒内只会执行一次
 * 函数防抖:函数频繁触发的情况下，只有函数触发的间隔超过指定间隔的时候，函数才会执行
 * @method debounceType
 * @param { funciton } fn   需要执行的函数
 * @param  {Number } wait   需要等待的时间,毫秒
 * @param { Boolean } throttle 是不是节流, 默认false,默认为防抖函数
 * @returns { undefined }
 */
export type debounceType = (
    fn: (...params: any) => any | void,
    wait?: number,
    throttle?: boolean
) => (this: any) => void

/**
 * 导出功能
 * @param { Array } columns 要导出的列
 * @param { Array } data 要导出的数据
 * @param { String } fileName 文件名称
 * @returns { undefined }
 */
export type exportExcelType = (
    columns: tableColumnType[],
    data: objType[],
    fileName: string
) => void

/**
 * 导出Excel模板(只有头部，没有数据)
 * @param columns 要导出的列
 * @param fileName 文件名称
 * @param omit 要过滤的列
 * @returns { undefined }
 */
export type exportExcelTempType = (
    columns: tableColumnType[],
    fileName: string,
    omit: string[]
) => void

/**
 * 导入功能
 * @param { Object } file 文件对象
 * @param { Array } columns 要导出的列
 * @returns { Promise }
 */
export type importExcelType = (
    file: File,
    columns: tableColumnType[]
) => Promise

/**
 * 表格合计行计算功能
 * @param data 待计算的数据
 * @param obj 需要计算的列
 */
export type summaryType = (data: objType[], obj?: objType) => any

/**
 * 生成距离当前时间指定天的时间范围
 * @param dayNum 指定要减去的天数，传负数可变成增加
 *
 * ```
 * 计算方式是 当前时间 - 指定天数
 * 例如: startandends(30) => [new Date('2021/6/24 00:00:00'), new Date('2021/7/24 23:59:59')]
 * ```
 */
export type startandendsType = (dayNum: number) => Date[]
