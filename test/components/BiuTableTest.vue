<template>
    <div>
        <button @click="setForm">按钮</button>
        <input type="text" v-model="form.name" />
        <biu-form v-model="form" :source="source"></biu-form>
        <BiuTable
            :virtual="false"
            :columns="columns"
            :tableData.sync="tableData"
            max-height="300"
        ></BiuTable>
        <BiuTable
            :columns="columns"
            :tableData.sync="tableData"
            max-height="300"
        ></BiuTable>
    </div>
</template>

<script>
import BiuTableSelectTest from './BiuTableSelectTest'
export default {
    data() {
        return {
            clickNumber: 1,
            form: {
                name: '',
                age: 1,
                tableData: [
                    {
                        packing: '',
                        goodsName: '',
                        number: '',
                        weight: '',
                        volume: '',
                        length: '',
                        width: '',
                        height: '',
                        netWeight: '',
                        remark: ''
                    },
                    {
                        packing: '',
                        goodsName: '',
                        number: '',
                        weight: '',
                        volume: '',
                        length: '',
                        width: '',
                        height: '',
                        netWeight: '',
                        remark: ''
                    }
                ]
            },
            tableData: [
                {
                    packing: '',
                    goodsName: '',
                    number: '',
                    weight: '',
                    volume: '',
                    length: '',
                    width: '',
                    height: '',
                    netWeight: '',
                    remark: ''
                },
                {
                    packing: '',
                    goodsName: '',
                    number: '',
                    weight: '',
                    volume: '',
                    length: '',
                    width: '',
                    height: '',
                    netWeight: '',
                    remark: ''
                }
            ]
        }
    },
    computed: {
        source() {
            return [
                {
                    formType: 'input',
                    label: '姓名',
                    id: 'name'
                },
                {
                    formType: 'input',
                    label: '年龄',
                    id: 'age'
                }
            ]
        },
        columns() {
            return [
                {
                    label: '商品编码',
                    id: 'packing',
                    editable: true,
                    required: true,
                    editRender: (h, { row, col }) => {
                        return (
                            <BiuTableSelectTest
                                v-model={row[col.id]}
                                multiple
                            ></BiuTableSelectTest>
                        )
                    }
                },
                {
                    label: '商品名称',
                    id: 'goodsName',
                    editable: true,
                    width: 150
                },
                {
                    label: '备注',
                    id: 'remark',
                    editable: true,
                    width: 200
                },
                {
                    label: '总数量',
                    id: 'number',
                    editable: true,
                    required: true
                    // editRender: (h, { row, col, $index }) => (
                    //     <el-input-number
                    //         style="width: 100%"
                    //         v-model={row[col.id]}
                    //         min={0}
                    //         precision={3}
                    //         controls={false}
                    //         size="mini"
                    //         onchange={() => this.setVolume($index)}
                    //     ></el-input-number>
                    // )
                },
                {
                    label: '总重量(KG)',
                    id: 'weight',
                    editable: true,
                    required: true
                    // editRender: (h, { row, col }) => (
                    //     <el-input-number
                    //         style="width: 100%"
                    //         v-model={row[col.id]}
                    //         min={0}
                    //         precision={3}
                    //         controls={false}
                    //         size="mini"
                    //     ></el-input-number>
                    // )
                },
                {
                    label: '总体积(m³)',
                    id: 'volume',
                    editable: true
                    // editRender: (h, { row, col }) => (
                    //     <el-input-number
                    //         style="width: 100%"
                    //         v-model={row[col.id]}
                    //         min={0}
                    //         precision={3}
                    //         controls={false}
                    //         size="mini"
                    //     ></el-input-number>
                    // )
                },
                {
                    label: '长(m)',
                    id: 'length',
                    editable: true
                    // editRender: (h, { row, col, $index }) => (
                    //     <el-input-number
                    //         style="width: 100%"
                    //         v-model={row[col.id]}
                    //         controls={false}
                    //         size="mini"
                    //         onchange={() => this.setVolume($index)}
                    //     ></el-input-number>
                    // )
                },
                {
                    label: '宽(m)',
                    id: 'width',
                    editable: true
                    // editRender: (h, { row, col, $index }) => (
                    //     <el-input-number
                    //         style="width: 100%"
                    //         v-model={row[col.id]}
                    //         controls={false}
                    //         size="mini"
                    //         onchange={() => this.setVolume($index)}
                    //     ></el-input-number>
                    // )
                },
                {
                    label: '高(m)',
                    id: 'height',
                    editable: true
                    // editRender: (h, { row, col, $index }) => (
                    //     <el-input-number
                    //         style="width: 100%"
                    //         v-model={row[col.id]}
                    //         controls={false}
                    //         size="mini"
                    //         onchange={() => this.setVolume($index)}
                    //     ></el-input-number>
                    // )
                },
                // {
                //     label: '箱号',
                //     id: 'caseNumber',
                //     editable: true
                // },
                {
                    label: '净重',
                    id: 'netWeight',
                    editable: true
                    // editRender: (h, { row, col }) => (
                    //     <el-input-number
                    //         style="width: 100%"
                    //         v-model={row[col.id]}
                    //         min={0}
                    //         precision={3}
                    //         controls={false}
                    //         size="mini"
                    //     ></el-input-number>
                    // )
                }
            ]
        }
    },
    methods: {
        /**
         * 计算体积
         */
        setVolume(index) {
            const row = this.form.tableData[index]

            if (row.number && row.length && row.width && row.height) {
                row.volume =
                    (row.number *
                        1000 *
                        (row.length * 1000) *
                        (row.width * 1000) *
                        (row.height * 1000)) /
                    (1000 * 1000 * 1000 * 1000)
            }
        },
        setForm() {
            this.form.name = '张三'
            this.form.age = '24'
        }
    }
}
</script>
