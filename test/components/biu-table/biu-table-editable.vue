<template>
    <biu-table
        :columns="columns"
        :table-data="tableData"
        editable
        :max-height="300"
    >
        <!-- 总数量编辑状态下显示 -->
        <template slot="number-edit" slot-scope="{ row, col }">
            <el-input-number
                style="width: 100%"
                v-model="row[col.id]"
                :min="0"
                :precision="3"
                :controls="false"
                size="mini"
            ></el-input-number>
        </template>
    </biu-table>
</template>

<script lang="tsx">
import { Vue, Component } from 'vue-property-decorator'
import { tableColumnType } from 'calm-harbin/types/biu-table'

@Component
export default class BiuTableBase extends Vue {
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
                width: 150,
                editable: true
            },
            {
                label: '总数量',
                id: 'number',
                editable: true
            },
            {
                label: '总重量(KG)',
                id: 'weight',
                editable: true,
                editRender: (h, { row, col }) => (
                    <el-input-number
                        style="width: 100%"
                        v-model={row[col.id]}
                        min={0}
                        precision={3}
                        controls={false}
                        size="mini"
                    ></el-input-number>
                )
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
}
</script>
