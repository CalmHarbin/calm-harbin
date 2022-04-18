<template>
    <div>
        <FileUpload accept=".xls,.xlsx" :import-file="importFile">
            <el-button>导入</el-button>
        </FileUpload>

        <el-button @click="exportFile">导出</el-button>
    </div>
</template>

<script>
import XLSX from 'xlsx'

export default {
    methods: {
        importFile(files) {
            const file = files[0]

            const fileReader = new FileReader()

            fileReader.onload = (e) => {
                // 读取文件
                const wb = XLSX.read(e.target?.result, {
                    type: 'binary',
                    cellDates: true
                })
                wb.SheetNames // 文件中所有的工作表名字
                wb.Sheets // 文件中所有工作表的内容
                // 将指定工作表对象转换为JSON对象数组
                XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
                console.log(
                    XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]])
                )
                console.log(wb)
            }

            fileReader.onerror = () => {
                throw new Error('Blob文件转换错误')
            }

            fileReader.readAsBinaryString(file) // file为文件对象
        },
        exportFile() {
            const workbook = XLSX.utils.book_new() // 创建一个工作薄

            const arrData = [
                ['姓名', '年龄', '电话'],
                ['张三', 23, '15800000000'],
                ['李四', 23, '15800000000']
            ]
            const jsonData = [
                {
                    姓名: '张三',
                    年龄: 23,
                    电话: '15800000000'
                },
                {
                    姓名: '李四',
                    年龄: 23,
                    电话: '15800000000'
                }
            ]
            const worksheet = XLSX.utils.aoa_to_sheet(arrData) // 数组格式转为工作表，推荐
            const worksheet2 = XLSX.utils.json_to_sheet(jsonData) // 对象格式转为工作表，会有重名问题。

            // 设置页边距
            worksheet['!margins'] = {
                left: 50,
                right: 5,
                top: 5,
                bottom: 5,
                header: 0.3,
                footer: 0.3
            }

            // 设置列信息
            worksheet['!cols'] = [
                {
                    hidden: false, // 是否隐藏
                    // wch: 4, // 列宽，字符一个汉字占2个字符
                    wpx: 100 // 像素宽度，经测试，Excel中的宽度=wpx * 1.67
                }
            ]

            // 设置行信息
            worksheet['!rows'] = [
                {
                    hidden: false,
                    hpx: 100 // 像素高度，经测试，Excel中的高度=hpx * 1.67
                }
            ]

            // 合并单元格
            worksheet['!merges'] = [
                {
                    s: 'A1', // 合并开始位置
                    e: 'B1' // 合并结束位置
                },
                {
                    s: 'B2',
                    e: 'B3'
                }
            ]

            // 将工作表添加到工作薄中，第三个参数为工作表名称，可选
            XLSX.utils.book_append_sheet(workbook, worksheet, '1班')
            XLSX.utils.book_append_sheet(workbook, worksheet2, '2班')

            // 将工作薄下载成文件
            XLSX.writeFile(workbook, `导出文件${Date.now()}.xlsx`, {
                bookType: 'xlsx', // 生成的文件格式
                bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
                type: 'base64' // 编码方式
            })
        }
    }
}
</script>
