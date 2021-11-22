<template>
    <BiuPage
        v-model="form"
        :columns="columns"
        :tableData="tableData"
        :operationOptions="operationOptions"
        :tbHeight="36 * 3"
    >
    </BiuPage>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { exportExcel } from 'calm-harbin'
import { OperationOptionType } from 'calm-harbin/types/operation'

@Component
export default class exportExcelDemo extends Vue {
    form = {}

    tableData = [
        {
            productCode: 'TCS202108310001',
            productName: '名称一',
            productType: '1'
        },
        {
            productCode: 'TCS202108310002',
            productName: '名称二',
            productType: '2'
        }
    ]

    get columns() {
        return [
            {
                formType: 'input',
                label: '商品编号',
                id: 'productCode'
            },
            {
                formType: 'input',
                label: '商品名称',
                id: 'productName'
            },
            {
                formType: 'select',
                label: '商品类型',
                id: 'productType',
                formAttr: {
                    multiple: true,
                    options: [
                        {
                            label: '文件',
                            value: '1'
                        },
                        {
                            label: '食品',
                            value: '2'
                        }
                    ]
                }
            }
        ]
    }
    get operationOptions(): OperationOptionType[] {
        return [
            {
                title: '导出',
                callback: () => {
                    exportExcel(
                        this.columns,
                        this.tableData,
                        '商品信息数据导出'
                    )
                }
            }
        ]
    }
}
</script>
