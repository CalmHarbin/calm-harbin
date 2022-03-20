<template>
    <div style="height: 500px">
        <biu-page
            v-model="form"
            :loading="loading"
            :columns="columns"
            :table-data="tableData"
            :operation-options="operationOptions"
            :table-postfix-options="tablePostfixOptions"
            show-header-filter
            show-summary
            selection
            :multiple-selection.sync="multipleSelection"
            :pagination.sync="pagination"
            @search="search"
            @reset="reset"
            @pagination="() => search()"
        >
            <!-- 表头插槽 -->
            <template slot="table-header-volume" slot-scope="{ col }">
                <span style="color: #409eff">{{ col.label }}</span>
            </template>
            <!-- 表头筛选框插槽 -->
            <template slot="table-form-volume" slot-scope="{ col }">
                <el-input
                    v-model="form[col.id]"
                    type="number"
                    size="mini"
                ></el-input>
            </template>
            <!-- 表格插槽写法，使用table-前缀 -->
            <template slot="table-volume" slot-scope="{ row, col, $index }">
                <div>{{ row[col.id] }}-{{ $index }}</div>
            </template>
            <!-- 表单插槽写法，使用form-前缀 -->
            <template slot="form-volume" slot-scope="{ col }">
                <el-form-item :label="col.label" :prop="col.id">
                    <el-input v-model="form[col.id]" type="number"></el-input>
                </el-form-item>
            </template>
        </biu-page>
    </div>
</template>

<script lang="tsx">
import { Vue, Component } from 'vue-property-decorator'
import { pageColumnsType, paginationType } from 'calm-harbin/types/biu-page'
import { OperationOptionType } from 'calm-harbin/types/operation'
import { tablePostfixOptionsType } from 'calm-harbin/types/biu-table'
import { startandends, exportExcel, summary } from 'calm-harbin'

const defaultValue = {
    createdTime: startandends(30) // 生成距离当前30天的时间，用法见文档中的方法
}
@Component
export default class BiuPageDemo extends Vue {
    form: any = { ...defaultValue }

    loading = false

    tableData: any[] = []

    // 多选的数据
    multipleSelection: any[] = []

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

    // 列配置
    get columns(): pageColumnsType[] {
        return [
            {
                formType: 'date',
                label: '下单时间',
                id: 'createdTime',
                width: 230,
                align: 'center',
                noShow: true,
                formAttr: {
                    dateType: 'daterange'
                }
            },
            {
                formType: 'select',
                label: '商品编码',
                id: 'packing',
                formAttr: {
                    options: this.packingOptions
                }
            },
            {
                formType: 'input',
                label: '商品名称',
                id: 'goodsName',
                width: 150
            },
            {
                formType: 'date',
                label: '发货时间',
                id: 'deliverTime',
                width: 230,
                align: 'center',
                timeFormat: 'YYYY-MM-DD hh:mm:ss',
                formAttr: {
                    dateType: 'daterange'
                }
            },
            {
                formType: 'area',
                label: '发货地',
                id: 'area',
                width: 200,
                formAttr: {
                    areaType: 'area'
                }
            },
            {
                formType: 'slot',
                label: '总数量',
                id: 'number',
                noSearch: true,
                formAttr: {
                    render: (h, { col }) => (
                        <el-input-number
                            style="width: 100%"
                            v-model={this.form[col.id]}
                            min={0}
                            precision={3}
                            controls={false}
                            size="mini"
                        ></el-input-number>
                    )
                }
            },
            {
                formType: 'slot',
                label: '总重量(KG)',
                id: 'weight',
                // 表头渲染
                headRender: (h, col) => {
                    return <span style="color: #409eff">{col.label}</span>
                },
                // 单元格渲染
                render: (h, { row, col, $index }) => (
                    <div>
                        {row[col.id]}-{$index}
                    </div>
                ),
                formAttr: {
                    // 表单自定义渲染
                    render: (h, col) => {
                        return (
                            <biu-form-item
                                formType="input"
                                style="width: 100%"
                                type="number"
                                v-model={this.form[col.id]}
                                size="mini"
                            ></biu-form-item>
                        )
                    }
                }
            },
            {
                formType: 'slot',
                label: '总体积(m³)',
                id: 'volume'
            },
            {
                formType: 'input',
                label: '长(m)',
                id: 'length'
            },
            {
                formType: 'input',
                label: '宽(m)',
                id: 'width'
            },
            {
                formType: 'input',
                label: '高(m)',
                id: 'height'
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

    // 按钮配置
    get operationOptions(): OperationOptionType[] {
        return [
            {
                title: '添加',
                hidden: false,
                callback: () => {
                    console.log('添加')
                }
            },
            {
                title: '导出全部',
                hidden: false,
                callback: () => {
                    exportExcel(
                        this.columns,
                        this.tableData.slice(0, -1),
                        'test数据导出'
                    )
                }
            }
        ]
    }

    // 表格右侧操作配置
    get tablePostfixOptions(): tablePostfixOptionsType[] {
        return [
            {
                title: '编辑',
                hidden: false,
                icon: 'el-icon-edit-outline',
                disabled: ({ $index }) => {
                    if ($index % 2 === 0) return true
                    return false
                },
                message: ({ $index }) => {
                    if ($index % 2 === 0) return '奇数行不可编辑哦'
                    return ''
                },
                callback: () => {
                    console.log('编辑')
                }
            },
            {
                title: '作废',
                hidden: false,
                icon: 'el-icon-delete',
                callback: () => {
                    console.log('作废')
                }
            }
        ]
    }

    created() {
        this.add(20)
    }

    pagination: paginationType = {
        page: 1,
        size: 20,
        total: 0
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
                    deliverTime: Date.now(),
                    area: '上海市-上海市-嘉定区',
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
            // 计算合计数据
            const total = summary(this.tableData, {
                number: 0,
                weight: 0,
                volume: 0,
                length: 0,
                width: 0,
                height: 0,
                netWeight: 0
            })
            this.tableData.push(total)
        }, 1000)
    }

    /**
     * 搜索
     */
    search() {
        console.log(this.form)
        alert(`搜索,参数${JSON.stringify(this.form)}`)
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
