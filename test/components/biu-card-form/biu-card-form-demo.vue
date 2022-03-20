<template>
    <biu-card-form
        ref="BiuCardForm"
        v-model="form"
        :source="source"
        :form-attr="{ rules: rules, 'label-width': '92px' }"
    ></biu-card-form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { reg } from 'calm-harbin'

@Component
export default class BiuCardFormDemo extends Vue {
    form: any = {}

    get source() {
        return [
            {
                title: '基础信息',
                list: [
                    {
                        formType: 'input',
                        id: 'ordercode',
                        label: '系统订单号'
                    },
                    {
                        formType: 'input',
                        id: 'carriercode',
                        label: '承运商单号'
                    },
                    {
                        formType: 'date',
                        id: 'created',
                        label: '下单时间',
                        dateType: 'datetime'
                    },
                    {
                        formType: 'select',
                        id: 'orderSource',
                        label: '订单来源',
                        dicType: '订单来源',
                        disable: true,
                        options: [
                            {
                                label: '订单录入',
                                value: '1'
                            },
                            {
                                label: '订单导入',
                                value: '2'
                            }
                        ]
                    }
                ]
            },
            {
                title: '发货人信息',
                list: [
                    {
                        formType: 'input',
                        id: 'sendPerson',
                        label: '发货人'
                    },
                    {
                        formType: 'input',
                        id: 'sendPhone',
                        label: '发货人电话'
                    },
                    {
                        formType: 'area',
                        id: 'sendArea',
                        label: '发货地区'
                    },
                    {
                        formType: 'input',
                        id: 'sendAddress',
                        label: '详细地址'
                    }
                ]
            },
            {
                title: '收货人信息',
                list: [
                    {
                        formType: 'input',
                        id: 'receivePerson',
                        label: '收货人'
                    },
                    {
                        formType: 'input',
                        id: 'receivePhone',
                        label: '收货人电话'
                    },
                    {
                        formType: 'area',
                        id: 'receiveArea',
                        label: '收货地区'
                    },
                    {
                        formType: 'input',
                        id: 'receiveAddress',
                        label: '详细地址'
                    }
                ]
            }
        ]
    }

    get rules() {
        return {
            sendPerson: [
                {
                    required: true,
                    message: '请输入发货人',
                    trigger: 'change'
                }
            ],
            sendPhone: [
                {
                    required: true,
                    message: '请输入发货人电话',
                    trigger: 'change'
                },
                {
                    type: 'string',
                    pattern: reg.phoneReg,
                    message: '发货人电话格式不正确',
                    trigger: 'change'
                }
            ]
        }
    }
}
</script>
