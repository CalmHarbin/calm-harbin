<template>
    <biu-table
        :columns="columns"
        :table-data="tableData"
        :expand-render="expandRender"
    ></biu-table>
</template>

<script lang="tsx">
import { Vue, Component } from 'vue-property-decorator'
import {
    tableColumnType,
    expandRenderPropType
} from 'calm-harbin/types/biu-table'

@Component
export default class BiuTableExpandRender extends Vue {
    tableData: any[] = []

    packingOptions = [
        {
            label: '苹果apple',
            value: 'apple'
        },
        {
            label: '橘子orange',
            value: 'orange'
        },
        {
            label: '梨pear',
            value: 'pear'
        }
    ]

    get columns(): tableColumnType[] {
        return [
            {
                formType: 'slot',
                label: '商品编码',
                id: 'packing',
                // 因为要显示label，所以使用render
                render: (h, { row, col }) => (
                    <div>
                        {this.packingOptions.find(
                            (i) => i.value === row[col.id]
                        )?.label || row[col.id]}
                    </div>
                )
            },
            {
                formType: 'input',
                label: '商品名称',
                id: 'goodsName',
                width: 150
            },
            {
                formType: 'input',
                label: '总数量',
                id: 'number'
            },
            {
                formType: 'input',
                label: '总重量(KG)',
                id: 'weight',
                // 使用render实现自定义渲染
                render: (h, { row, col }) => <div>custom-{row[col.id]}</div>
            },
            {
                formType: 'input',
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

    /**
     * 控制展开渲染内容
     */
    expandRender(h: any, { row, $index }: expandRenderPropType) {
        return (
            <div style="padding-left: 80px;">
                第{$index + 1}行，内容是 {JSON.stringify(row)}
            </div>
        )
    }

    created() {
        this.add(5)
    }

    /**
     * 添加数据
     */
    add(num: number) {
        const length = this.tableData.length

        new Array(num).fill('').forEach((_item, index) => {
            this.tableData.push({
                id: `${length + index}`,
                packing: ['apple', 'orange', 'pear'][~~(Math.random() * 3)],
                goodsName: ['苹果', '橘子', '梨'][~~(Math.random() * 3)],
                number: ~~(Math.random() * 1000),
                remark: '',
                weight: 10,
                volume: 1000,
                length: 10,
                width: 10,
                height: 10,
                netWeight: 99.99
            })
        })
    }
}
</script>
