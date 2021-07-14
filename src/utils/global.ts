import { merge, cloneDeep } from 'lodash'

export default {
    // 针对表格控件,修改列
    setColumn(arr: any[], obj: any) {
        const copyArr: any[] = cloneDeep(arr)
        for (const key in obj) {
            const index = copyArr.findIndex((item) => item.id === key)
            if (index !== -1) {
                copyArr[index] = merge(copyArr[index], obj[key])
            }
        }
        return copyArr
    },
    // 针对表格控件,删除列
    removeColumn(source: any[], removeArr: string[]) {
        return source.filter((item) => !removeArr.includes(item.id))
    },
    // 针对表格控件,查找列
    indexOfColumn(source: any[], id: string) {
        return source.map((item) => item.id).indexOf(id)
    },
    // 针对表格控制,插入列
    insertColumn(source: any[], id: string, insertArr: any[]) {
        const list = cloneDeep(source)
        insertArr.reverse().forEach((item) => {
            list.splice(this.indexOfColumn(source, id), 0, item)
        })
        return list
    }
}
