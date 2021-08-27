// import XLSX from 'xlsx'
import { Message } from 'element-ui'
import { Decimal } from 'decimal.js'
import dayjs from 'dayjs'
/*
 * 函数节流:当连续触发函数时,函数在n秒内只会执行一次
 * 函数防抖:函数频繁触发的情况下，只有函数触发的间隔超过指定间隔的时候，函数才会执行
 * @method debounce
 * @param {funciton} fn   需要执行的函数
 * @param {Number} wait   需要等待的时间,毫秒
 * @param {Boolean} throttle 是不是节流, 默认false,默认为防抖函数
 * @returns {undefined}
 */
export const debounce = function (
    fn: (...params: any) => any | void,
    wait = 500,
    throttle = false
) {
    let timeout: number | null
    return function (this: any) {
        const context = this
        // eslint-disable-next-line prefer-rest-params
        const args: any = arguments
        if (throttle) {
            //节流
            if (!timeout) {
                timeout = setTimeout(function () {
                    timeout = null
                    fn.apply(context, args)
                }, wait)
            }
        } else {
            //防抖
            if (timeout) clearTimeout(timeout)
            timeout = setTimeout(function () {
                fn.apply(context, args)
            }, wait)
        }
    }
}

/**
 * 导出功能
 * @param columns antd columns
 * @param data antd table dataSource
 * @param fileName 文件名称
 */
export const exportExcel = (columns: any[], data: any[], fileName: string) => {
    if (!data?.length) {
        Message({
            message: '没有要导出的数据',
            type: 'warning'
        })
        return
    }

    const header = columns.filter((item) => !item.noShow)

    const aoaData = [header.map((item) => item.label)]

    data.forEach((item) => {
        const rowData = header.reduce((row, column) => {
            let val = item[column.id] ?? ''
            if (
                (column.formType === 'select' ||
                    column.formType === 'dicSelect') &&
                val !== ''
            ) {
                // 下拉菜单数据转化
                val =
                    column?.formAttr?.options?.find(
                        (i: any) => i.value === val.toString()
                    )?.label || val
            } else if (column.timeFormat && val) {
                // 时间转化
                val = dayjs(val).format(column.timeFormat)
            }
            return [...row, val]
        }, [])
        aoaData.push(rowData)
    })

    const worksheet = XLSX.utils.aoa_to_sheet(aoaData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet)
    XLSX.writeFile(workbook, `${fileName || '导出文件'}_${Date.now()}.xls`, {
        bookType: 'xls', // 生成的文件格式
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'base64' // 编码方式
    })
}

/**
 * 表格合计行计算功能
 * @param list 待计算的数据
 * @param obj 需要计算的列
 */
export const summary = (list: any[] = [], obj = {}) => {
    const total = list.reduce((prev: any, cur: any) => {
        for (const key in obj) {
            if (cur[key]) {
                // 相加时防止精度问题
                prev[key] = new Decimal(prev[key]).plus(cur[key]).toNumber()
            }
        }
        return prev
    }, obj)
    return total
}
