<template>
    <div>
        <el-button @click="add(10)">添加10条数据</el-button>
        <el-button @click="add(100)">添加100条数据</el-button>
        <el-button @click="add(10000)">添加10000条数据</el-button>
        <el-button @click="tableData = []">清空数据</el-button>
        <el-button @click="Immutable = !Immutable"
            >{{ Immutable ? '取消' : '设置' }}固定高</el-button
        >
        <el-button @click="virtual = !virtual"
            >{{ virtual ? '关闭' : '开启' }}虚拟表格</el-button
        >
        <biu-table
            :loading="loading"
            :columns="columns"
            :virtual="virtual"
            :table-data="tableData"
            :tb-height="Immutable ? 300 : undefined"
            :max-height="500"
        >
            <!-- 总数量自定义显示 -->
            <template slot="number" slot-scope="{ row, col }">
                custom-{{ row[col.id] }}
            </template>
        </biu-table>
    </div>
</template>

<script lang="tsx">
import { Vue, Component } from 'vue-property-decorator'
import { tableColumnType } from 'calm-harbin/types/biu-table'

@Component
export default class BiuTableBase extends Vue {
    Immutable = false // 为true时固定高度

    virtual = true // 开启虚拟表格

    tableData: any[] = []

    loading = false

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
                id: 'weight',
                // 使用render实现自定义渲染
                render: (h, { row, col }) => <div>custom-{row[col.id]}</div>
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

    /**
     * 添加数据
     */
    add(num: number) {
        this.loading = true
        const length = this.tableData.length

        setTimeout(() => {
            new Array(num).fill('').forEach((_item, index) => {
                this.tableData.push({
                    id: length + index,
                    packing: 'apple',
                    goodsName: '苹果苹果苹果苹果苹果苹果苹果',
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
            this.loading = false
        }, 1000)
    }
}
</script>
