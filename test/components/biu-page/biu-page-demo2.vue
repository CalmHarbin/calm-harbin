<template>
    <div style="height: 500px">
        <biu-page
            v-model="form"
            :loading="loading"
            :columns="columns"
            :tableData="tableData"
            show-header-filter
            @search="search"
            @reset="reset"
        ></biu-page>
    </div>
</template>

<script lang="tsx">
import { Vue, Component } from 'vue-property-decorator'
import { pageColumnsType } from 'calm-harbin/types/biu-page'
import { startandends } from 'calm-harbin'

const defaultValue = {
    createdTime: startandends(30) // 生成距离当前30天的时间，用法见文档中的方法
}
@Component
export default class BiuPageDemo extends Vue {
    form: any = { ...defaultValue }

    loading = false

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
                label: '总重量(KG)',
                id: 'weight',
                // 使用render实现自定义渲染
                noSearch: true,
                render: (h, { row, col }) => <div>custom-{row[col.id]}</div>
            },
            {
                formType: 'input',
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
