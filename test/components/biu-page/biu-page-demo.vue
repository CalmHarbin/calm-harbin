<template>
    <div style="height: 300px">
        <biu-page
            v-model="form"
            :loading="loading"
            :columns="columns"
            :tableData="tableData"
            @search="search"
            @reset="reset"
        ></biu-page>
    </div>
</template>

<script lang="tsx">
import { Vue, Component } from 'vue-property-decorator'
import { pageColumnsType } from 'calm-harbin/types/biu-page'

const defaultValue = {}
@Component
export default class BiuPageDemo extends Vue {
    form: any = { ...defaultValue }

    loading = false

    tableData: any[] = []

    modeOptions = [
        {
            label: '编辑按钮',
            value: '1'
        },
        {
            label: '点击行',
            value: '2'
        },
        {
            label: '点击单元格',
            value: '3'
        }
    ]

    get columns(): pageColumnsType[] {
        return [
            {
                formType: 'select',
                label: '商品编码',
                id: 'packing',
                formAttr: {
                    options: this.modeOptions
                }
            },
            {
                label: '商品名称',
                id: 'goodsName',
                noSearch: true,
                width: 150
            },
            {
                label: '总数量',
                id: 'number',
                noSearch: true
            },
            {
                label: '总重量(KG)',
                id: 'weight',
                // 使用render实现自定义渲染
                noSearch: true,
                render: (h, { row, col }) => <div>custom-{row[col.id]}</div>
            },
            {
                label: '总体积(m³)',
                id: 'volume',
                noSearch: true
            },
            {
                label: '长(m)',
                id: 'length',
                noSearch: true
            },
            {
                label: '宽(m)',
                id: 'width',
                noSearch: true
            },
            {
                label: '高(m)',
                id: 'height',
                noSearch: true
            },
            {
                label: '净重',
                id: 'netWeight',
                noSearch: true
            },
            {
                label: '备注',
                id: 'remark',
                width: 200,
                noSearch: true
            }
        ]
    }

    created() {
        this.add(20)
    }

    /**
     * 添加数据
     */
    add(num: number) {
        const length = this.tableData.length

        setTimeout(() => {
            new Array(num).fill('').forEach((_item, index) => {
                this.tableData.push({
                    id: length + index,
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
        }, 1000)
    }

    /**
     * 搜索
     */
    search() {
        alert('搜索')
    }

    /**
     * 重置
     */
    reset() {
        this.form = { ...defaultValue }
        alert('重置')
        this.search()
    }
}
</script>
