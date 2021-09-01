<template>
    <div>
        {{ Date.now() }}
        <BiuForm :source="source[0].list"></BiuForm>

        <!-- <biu-card title="标题"></biu-card> -->

        <!-- <BiuTable :columns="columns" :tableData="[]"></BiuTable>

        <BiuCardForm
            v-model="form"
            :source="source"
            :formAttr="{
                resize: false,
                'label-position': 'right',
                'label-width': '90px',
                rules: rules
            }"
        >
            <template v-slot:goods>
                <BiuTable
                    editable
                    :columns="columns"
                    :tableData="[{}]"
                ></BiuTable>
            </template>
        </BiuCardForm> -->
    </div>
</template>

<script>
// import BiuCardForm from '@/components/BiuCardForm/index.vue';
import { phoneReg } from '@src/utils/regExp.js'

console.log(27, phoneReg)

export default {
    // components: { BiuCardForm },
    data() {
        return {
            form: {}
        }
    },
    computed: {
        source() {
            return [
                {
                    title: '基础信息',
                    list: [
                        {
                            formType: 'input',
                            label: '发货客户',
                            id: '发货客户'
                        },
                        {
                            formType: 'input',
                            label: '系统订单号',
                            id: '系统订单号',
                            disabled: true,
                            placeholder: '系统自动生成'
                        },
                        {
                            formType: 'input',
                            label: '客户订单号',
                            id: '客户订单号'
                        },
                        {
                            formType: 'date',
                            dateType: 'datetime',
                            label: '下单时间',
                            id: '下单时间'
                        },
                        {
                            formType: 'select',
                            label: '业务类型',
                            id: '业务类型',
                            options: []
                        },
                        {
                            formType: 'select',
                            label: '货物类型',
                            id: '货物类型',
                            options: []
                        },
                        {
                            formType: 'input',
                            label: '备注',
                            id: '备注',
                            span: 12
                        },
                        {
                            formType: 'select',
                            label: '发货工场',
                            id: '发货工场',
                            options: []
                        },
                        {
                            formType: 'select',
                            label: '经销商',
                            id: '经销商',
                            options: []
                        },
                        {
                            formType: 'select',
                            label: '计划承运商',
                            id: '计划承运商',
                            options: [],
                            span: 12
                        }
                    ]
                },
                {
                    title: '收发货信息',
                    list: [
                        {
                            formType: 'input',
                            label: '发货方',
                            id: '发货方',
                            span: 12
                        },
                        {
                            formType: 'input',
                            label: '收货方',
                            id: '收货方',
                            span: 12
                        },
                        {
                            formType: 'input',
                            label: '发货人',
                            id: '发货人'
                        },
                        {
                            formType: 'input',
                            label: '发货人电话',
                            id: '发货人电话'
                        },
                        {
                            formType: 'input',
                            label: '收货人',
                            id: '收货人'
                        },
                        {
                            formType: 'input',
                            label: '收货人电话',
                            id: '收货人电话'
                        },
                        {
                            formType: 'area',
                            label: '发货地区',
                            id: '发货地区'
                        },
                        {
                            formType: 'date',
                            dateType: 'datetime',
                            label: '希望提货日期',
                            id: '希望提货日期'
                        },
                        {
                            formType: 'area',
                            label: '收货地区',
                            id: '收货地区'
                        },
                        {
                            formType: 'date',
                            dateType: 'datetime',
                            label: '希望送达日期',
                            id: '希望送达日期'
                        },
                        {
                            formType: 'input',
                            label: '详细地址',
                            id: 'send详细地址',
                            span: 12
                        },
                        {
                            formType: 'input',
                            label: '详细地址',
                            id: '详细地址',
                            span: 12
                        }
                    ]
                },
                {
                    title: '商品信息',
                    id: 'goods'
                },
                {
                    title: '其他信息',
                    list: [
                        {
                            formType: 'input',
                            label: '回单份数',
                            id: '回单份数'
                        },
                        {
                            formType: 'date',
                            dateType: 'datetime',
                            label: '希望回单时间',
                            id: '希望回单时间'
                        },
                        {
                            formType: 'input',
                            label: '回单要求',
                            id: '回单要求',
                            span: 12
                        },
                        {
                            formType: 'input',
                            label: '订单备注',
                            id: '订单备注',
                            span: 12
                        },
                        {
                            formType: 'input',
                            label: '配送要求',
                            id: '配送要求',
                            span: 12
                        }
                    ]
                }
            ]
        },
        rules() {
            return {
                备注: [
                    {
                        required: true,
                        message: '请输入备注',
                        trigger: 'change'
                    }
                ],
                发货人电话: [
                    {
                        type: 'string',
                        pattern: phoneReg,
                        message: '发货人电话格式不正确',
                        trigger: 'change'
                    }
                ]
            }
        },
        columns() {
            return [
                {
                    label: '商品名称',
                    id: '商品名称id',
                    editable: true,
                    required: true
                },
                {
                    label: '包装类型包装类型包装类型包装类型',
                    id: '包装类型',
                    editable: true
                },
                {
                    label: '总数量',
                    id: '总数量',
                    editable: true
                },
                {
                    label: '总体积(m³)',
                    id: '总体积(m³)',
                    editable: true
                },
                {
                    label: '总重量(KG)',
                    id: '总重量(KG)',
                    editable: true
                },
                {
                    label: '净重',
                    id: '净重'
                },
                {
                    label: '内务数量',
                    id: '内务数量'
                },
                {
                    label: '备注',
                    id: '备注'
                }
            ]
        }
    }
}
</script>
