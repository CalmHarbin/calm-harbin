import XLSX from 'xlsx'
import { Message } from 'element-ui'
import { Decimal } from 'decimal.js'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import {
    debounceType,
    exportExcelType,
    exportExcelTempType,
    importExcelType,
    summaryType
} from 'calm-harbin/types/utils'
import { tableColumnType } from '@/types/biu-table'
import { objType } from '@/types'

/**
 * 函数节流:当连续触发函数时,函数在n秒内只会执行一次
 * 函数防抖:函数频繁触发的情况下，只有函数触发的间隔超过指定间隔的时候，函数才会执行
 * @method debounce
 * @param {funciton} fn   需要执行的函数
 * @param {Number} wait   需要等待的时间,毫秒
 * @param {Boolean} throttle 是不是节流, 默认false,默认为防抖函数
 * @returns {undefined}
 */
export const debounce: debounceType = function (
    fn,
    wait = 500,
    throttle = false
) {
    let timeout: number | null
    return function (this) {
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
export const exportExcel: exportExcelType = (
    columns,
    data,
    fileName: string
) => {
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
        const rowData = header.reduce((row: string[], column) => {
            let val = item[column.id] ?? ''
            if (
                (column.formType === 'select' ||
                    column.formType === 'dicSelect') &&
                val !== ''
            ) {
                // 下拉菜单数据转化
                val =
                    column?.formAttr?.options?.find(
                        (i) => i.value === val.toString()
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
 * 导出Excel模板(只有头部，没有数据)
 * @param columns antd columns
 * @param fileName 文件名称
 * @param omit 要过滤的l
 */
export const exportExcelTemp: exportExcelTempType = (
    columns,
    fileName,
    omit
) => {
    const header = columns.reduce((obj: any, cur: any) => {
        if (cur.noShow || (omit && omit.includes(cur.id))) return obj
        return { ...obj, [cur.label]: '' }
    }, {})
    const worksheet = XLSX.utils.json_to_sheet([header])
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet)
    XLSX.writeFile(workbook, `${fileName || '导出文件'}模板.xls`, {
        bookType: 'xls', // 生成的文件格式
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'base64' // 编码方式
    })
}

/**
 * 导入Excel
 * @param file
 * @param columns
 */
export const importExcel: importExcelType = (file, columns) =>
    new Promise((resolve) => {
        if (file === undefined) {
            throw new Error('没有要上传的文件')
        }
        const fileReader = new FileReader()
        fileReader.onload = (e) => {
            const wb = XLSX.read(e.target?.result, {
                type: 'binary',
                cellDates: true
            })

            const data = wb.Sheets[wb.SheetNames[0]]
            const colList = [] // 存储所有的列（不包含数字），A，B
            let rowLength = 0 // 记录由多少行

            // 统计有多少列
            for (const key in data) {
                // 根据数据含有1的来判断，例如A1，B1
                const col = key.replace(/[A-Z]/g, '')
                const isCol = /[A-Z]/g.test(key) // 只有列才有大写字母
                if (isCol && col === '1') {
                    colList.push(key.replace(/\d/g, ''))
                }
            }

            // 统计有多少行
            for (const key in data) {
                // 根据数据含有1的来判断，例如A1，B1
                const col = key.replace(/[A-Z]/g, '')
                const isCol = /[A-Z]/g.test(key) // 只有列才有大写字母

                // 只记录存在列头的最大行
                if (isCol && colList.includes(key.replace(/\d/g, ''))) {
                    rowLength = Math.max(rowLength, Number(col))
                }
            }

            const aoaData: string[][] = []

            for (let rowIndex = 1; rowIndex <= rowLength; ) {
                const row = colList.map((item) => {
                    if (rowIndex === 1) {
                        return data[`${item}${rowIndex}`]
                            ? String(data[`${item}${rowIndex}`].v)
                            : undefined
                    }
                    return data[`${item}${rowIndex}`]
                        ? data[`${item}${rowIndex}`].v
                        : undefined
                })
                aoaData.push(row)
                rowIndex += 1
            }

            if (columns?.length) {
                /**
                 * aoaData [
                 *      ['列头', '列头', '列头'],
                 *      ['数据', '数据', '数据']
                 * ]
                 */
                const tableData = aoaData.reduce((sum, item, index) => {
                    const customColumns: tableColumnType[] = cloneDeep(columns)
                    // 去掉列头的循环
                    if (index) {
                        // 将数组中所有数据转化成一个对象
                        const row = item.reduce((obj, value, idx): objType => {
                            // 当列头存在时
                            if (aoaData[0][idx]) {
                                // 用列头去columns中寻找id
                                const position: number =
                                    customColumns.findIndex(
                                        (column) =>
                                            column.label?.trim() ===
                                            aoaData[0][idx].trim()
                                    )

                                if (position > -1) {
                                    obj[customColumns[position].id] = value
                                    customColumns.splice(position, 1)
                                } else {
                                    obj[aoaData[0][idx].trim()] = value
                                }
                            }
                            return obj
                        }, {} as objType)

                        return [...sum, row]
                    }
                    return []
                }, [] as objType[])
                resolve(tableData)
            } else {
                resolve(aoaData)
            }
        }

        fileReader.onerror = () => {
            throw new Error('Blob文件转换错误')
        }

        fileReader.readAsBinaryString(file)
    })

/**
 * 表格合计行计算功能
 * @param data 待计算的数据
 * @param obj 需要计算的列
 */
export const summary: summaryType = (data = [], obj = {}) => {
    const total = data.reduce((prev: any, cur: any) => {
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

/**
 * 下载文件，传入文件全路径下载
 * @param { string } url 文件全路径
 */
export const downLoadFile = (url: string) => {
    const iframe = document.createElement('iframe')
    const timestamp = Date.now()
    iframe.src = url
    iframe.id = `iframe${timestamp}`
    iframe.style.display = 'none'
    document.body.appendChild(iframe)
    setTimeout(() => {
        document.getElementById(`iframe${timestamp}`)?.remove()
    }, 1000)
}
