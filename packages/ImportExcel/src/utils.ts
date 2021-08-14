import XLSX from 'xlsx'
import trim from 'lodash/trim'

/**
 * 导出Excel模板(只有头部，没有数据)
 * @param columns antd columns
 * @param fileName 文件名称
 * @param omit 要过滤的dataIndex
 */
export const exportExcelTemp = (
    columns: any[],
    fileName: string,
    ...omit: string[]
) => {
    const header = columns.reduce((cols, cur) => {
        if (cur.noShow || (omit && omit.includes(cur.id))) return cols
        return [...cols, cur.label]
    }, [])
    const worksheet = XLSX.utils.aoa_to_sheet([header])
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
 * @param fieldMap
 * @param jObject
 */
export const importExcel = (
    file: File,
    fieldMap?: Record<string, any>,
    jObject?: (
        // eslint-disable-next-line no-shadow
        jObject: Record<string, any>,
        index: number
    ) => Record<string, any>
) => {
    return new Promise<any>((resolve) => {
        if (file === undefined) {
            throw new Error('没有要上传的文件')
        }
        const fileReader = new FileReader()
        fileReader.onload = (e: any) => {
            const wb = XLSX.read(e.target?.result, {
                type: 'binary',
                cellDates: true
            })
            const jArray = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])

            if (fieldMap) {
                const dataSource = jArray.reduce(
                    (arr: any[], cur: any, index: number) => {
                        const obj: any = {}
                        Object.keys(cur).forEach((item: string) => {
                            obj[fieldMap[item]] = cur[trim(item)]
                        })
                        if (typeof jObject === 'function') {
                            arr.push(jObject(obj, index))
                        } else {
                            arr.push(obj)
                        }
                        return arr
                    },
                    []
                )
                resolve(dataSource)
            } else {
                resolve(jArray)
            }
        }

        fileReader.onerror = () => {
            throw new Error('Blob文件转换错误')
        }

        fileReader.readAsBinaryString(file)
    })
}
