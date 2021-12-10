<template>
    <div>
        <Operation :operationOptions="footer"></Operation>

        <biu-table
            :columns="columns"
            :table-data="tableData"
            :max-height="500"
        ></biu-table>
    </div>
</template>

<script lang="tsx">
import { Vue, Component } from 'vue-property-decorator'
import { tableColumnType } from 'calm-harbin/types/biu-table'
import { OperationOptionType } from 'calm-harbin/types/operation'
import { exportExcelTemp, importExcel } from 'calm-harbin'

@Component
export default class importExcelDemo extends Vue {
    tableData: any[] = []

    get columns(): tableColumnType[] {
        return [
            {
                label: '商品编码',
                id: 'packing'
            },
            {
                label: '商品名称',
                id: 'goodsName',
                width: 150
            },
            {
                label: '总数量',
                id: 'number'
            },
            {
                label: '总重量(KG)',
                id: 'weight'
            },
            {
                label: '总体积(m³)',
                id: 'volume'
            },
            {
                label: '长(m)',
                id: 'length'
            },
            {
                label: '宽(m)',
                id: 'width'
            },
            {
                label: '高(m)',
                id: 'height'
            },
            {
                label: '净重',
                id: 'netWeight'
            },
            {
                label: '备注',
                id: 'remark',
                width: 200
            }
        ]
    }

    get footer(): OperationOptionType[] {
        return [
            {
                render: () => (
                    <file-upload
                        divStyle={{
                            display: 'inline',
                            marginRight: '10px'
                        }}
                        accept=".xls,.xlsx"
                        importFile={this.importFile}
                    >
                        <el-button type="primary" size="mini">
                            选择文件
                            <i class="el-icon-upload el-icon--right"></i>
                        </el-button>
                    </file-upload>
                )
            },
            {
                title: '保存',
                callback: () => {
                    this.$emit('submit')
                },
                btnProps: {
                    disabled: this.tableData.length === 0
                }
            },
            {
                title: '清空数据',
                callback: () => {
                    this.$emit('clear')
                },
                btnProps: {
                    disabled: this.tableData.length === 0
                }
            },
            {
                title: '下载模板',
                callback: () => {
                    exportExcelTemp(this.columns, '导入演示')
                }
            }
        ]
    }

    importFile(files: File[]) {
        console.log(files)
        importExcel(files[0], this.columns).then((res) => {
            console.log(res)
        })
    }
}
</script>
