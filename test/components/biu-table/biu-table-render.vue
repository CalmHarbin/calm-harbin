<template>
    <biu-table
        v-model="form"
        :columns="columns"
        :table-data="tableData"
        show-header-filter
        :max-height="500"
        @search="search"
    >
        <!-- 头部插槽 -->
        <template slot="header-goodsName" slot-scope="{ col }">
            <span style="color: #409eff">{{ col.label }}</span>
        </template>
        <!-- 筛选框插槽 -->
        <template slot="form-goodsName" slot-scope="{ col }">
            <el-input
                v-model="form[col.id]"
                type="number"
                size="mini"
            ></el-input>
        </template>
        <!-- 单元格插槽 -->
        <template slot="goodsName" slot-scope="{ row, col, $index }">
            {{ row[col.id] }} - {{ $index }}
        </template>
    </biu-table>
</template>

<script lang="tsx">
import { Vue, Component } from 'vue-property-decorator'
import { tableColumnType } from 'calm-harbin/types/biu-table'

@Component
export default class BiuTableBase extends Vue {
    form: any = {
        goodsName: ''
    }
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
                headRender: (h, col) => {
                    return <span style="color: #409eff">{col.label}</span>
                },
                // 因为要显示label，所以使用render
                render: (h, { row, col }) => (
                    <div>
                        {this.packingOptions.find(
                            (i) => i.value === row[col.id]
                        )?.label || row[col.id]}
                    </div>
                ),
                formAttr: {
                    render: (h, col) => {
                        console.log(col)
                        return (
                            <biu-form-item
                                formType="select"
                                style="width: 100%"
                                v-model={this.form[col.id]}
                                options={this.packingOptions}
                                size="mini"
                            ></biu-form-item>
                        )
                    }
                }
            },
            {
                formType: 'slot',
                label: '商品名称',
                id: 'goodsName',
                width: 150
            },
            {
                formType: 'input',
                label: '总数量',
                id: 'number'
            }
        ]
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
    }

    /**
     * 搜索
     */
    search() {
        // form含有最新的数据，可以用来自行实现过滤逻辑
        console.log(this.form)
    }
}
</script>
