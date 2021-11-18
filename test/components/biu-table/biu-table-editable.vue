<template>
    <div>
        <biu-form-item
            formType="select"
            v-model="mode"
            :options="modeOptions"
            size="mini"
        ></biu-form-item>

        <el-button @click="editAction = !editAction"
            >{{ editAction ? '隐藏' : '显示' }}加减行按钮</el-button
        >
        <biu-table
            :columns="columns"
            :table-data="tableData"
            :virtual="false"
            :max-height="300"
            :edit-config="editConfig"
            :edit-action="editAction"
            :plus="plus"
        >
            <!-- 宽度编辑状态下显示 -->
            <template slot="width-edit" slot-scope="{ row, col, $index }">
                <el-input-number
                    style="width: 100%"
                    v-model="row[col.id]"
                    :min="0"
                    :precision="2"
                    :controls="false"
                    size="mini"
                    @change="() => setVolume(row, $index)"
                ></el-input-number>
            </template>
        </biu-table>
    </div>
</template>

<script lang="tsx">
import { Vue, Component } from 'vue-property-decorator'
import { tableColumnType } from 'calm-harbin/types/biu-table'
import Decimal from 'decimal.js'

@Component
export default class BiuTableBase extends Vue {
    tableData: any[] = [
        {
            packing: 'apple',
            goodsName: '苹果',
            number: 999,
            weight: 666,
            volume: 888,
            length: 10,
            width: 10,
            height: 10,
            netWeight: 500,
            remark: '大苹果'
        },
        {
            goodsName: '橘子'
        },
        {
            goodsName: '梨'
        }
    ]

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

    mode = '1'
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

    editAction = true

    /**
     * 表格列
     */
    get columns(): tableColumnType[] {
        return [
            {
                label: '商品编码',
                id: 'packing',
                editable: true,
                // 因为要显示label，所以使用render
                render: (h, { row, col }) => (
                    <div>
                        {this.packingOptions.find(
                            (i) => i.value === row[col.id]
                        )?.label || row[col.id]}
                    </div>
                ),
                editRender: (h, { row, col }) => (
                    <biu-form-item
                        formType="select"
                        style="width: 100%"
                        v-model={row[col.id]}
                        options={this.packingOptions}
                        size="mini"
                    ></biu-form-item>
                )
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
                editable: true,
                required: true
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
                label: '长(cm)',
                id: 'length',
                editable: true,
                editRender: (h, { row, col, $index }) => (
                    <el-input-number
                        style="width: 100%"
                        v-model={row[col.id]}
                        min={0}
                        precision={2}
                        controls={false}
                        size="mini"
                        onchange={() => this.setVolume(row, $index)}
                    ></el-input-number>
                )
            },
            {
                label: '宽(cm)',
                id: 'width',
                editable: true
            },
            {
                label: '高(cm)',
                id: 'height',
                editable: true,
                editRender: (h, { row, col, $index }) => (
                    <el-input-number
                        style="width: 100%"
                        v-model={row[col.id]}
                        min={0}
                        precision={2}
                        controls={false}
                        size="mini"
                        onchange={() => this.setVolume(row, $index)}
                    ></el-input-number>
                )
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
     * 触发模式
     */
    get editConfig() {
        if (this.mode === '2') {
            return { trigger: 'click', mode: 'row' }
        }
        if (this.mode === '3') {
            return { trigger: 'click', mode: 'cell' }
        }
        return { trigger: 'manual', mode: 'row' }
    }

    /**
     * 改变体积
     */
    setVolume(row: any, $index: number) {
        const volume = new Decimal(row.length || 0)
            .times(row.width || 0)
            .times(row.height || 0)
            .dividedBy(1000000)
            .toNumber()

        /**
         * 这里不能使用：this.tableData[$index] = { ...row, volume }
         * 因为vue监听不到tableData的改变,需要改变tableData才会使页面渲染更新
         */
        this.tableData = [
            ...this.tableData.slice(0, $index),
            { ...row, volume },
            ...this.tableData.slice($index + 1)
        ]
    }

    /**
     * 可以通过这个方式自定义设置插入的数据
     * @param { Object } row 默认插入的数据
     */
    plus(row: any) {
        return {
            ...row,
            packing: 'apple'
        }
    }
}
</script>
