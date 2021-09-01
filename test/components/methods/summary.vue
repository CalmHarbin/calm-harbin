<template>
    <BiuPage
        v-model="form"
        :columns="columns"
        :tableData="tableData"
        show-summary
    >
    </BiuPage>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { summary } from 'calm-harbin'
@Component
export default class summaryDemo extends Vue {
    form = {}

    tableData: any[] = []

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
            },
            {
                formType: 'input',
                label: '商品数量',
                id: 'number'
            }
        ]
    }

    mounted() {
        const tableData = [
            {
                productCode: 'TCS202108310001',
                productName: '名称一',
                productType: '1',
                number: 24
            },
            {
                productCode: 'TCS202108310002',
                productName: '名称二',
                productType: '2',
                number: 32
            }
        ]
        // 添加合计
        const total = summary(tableData, {
            number: 0 // 这里传入需要合计的字段
        })
        this.tableData = [...tableData, total]
    }
}
</script>
