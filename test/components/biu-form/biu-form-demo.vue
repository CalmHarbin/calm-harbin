<template>
    <div>
        <biu-form
            ref="biuForm"
            v-model="form"
            :source="source"
            :rules="rules"
            label-width="92px"
            label-position="right"
        ></biu-form>
        <operation :operation-options="operationOptions"></operation>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { reg } from 'calm-harbin'
import { BiuformType } from 'calm-harbin/types/biu-form'
import { OperationOptionType } from 'calm-harbin/types/operation'

@Component
export default class BiuFormDemo extends Vue {
    form: any = {}

    loading = false

    get source(): BiuformType[] {
        return [
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
            },
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
            },
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
            },
            {
                formType: 'input',
                id: 'remark',
                label: '备注',
                span: 24,
                type: 'textarea'
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

    get operationOptions(): OperationOptionType[] {
        return [
            {
                title: '重置',
                callback: () => {
                    this.form = {}
                }
            },
            {
                title: '提交',
                loading: this.loading,
                btnProps: {
                    plain: true
                },
                callback: this.submit
            }
        ]
    }

    /**
     * 提交表单
     */
    submit() {
        console.log('提交')
        ;(this.$refs.biuForm as any).validate((valid: boolean) => {
            if (valid) {
                this.loading = true
                setTimeout(() => {
                    this.$notify({
                        title: '提交成功',
                        message: '成功添加一条运单',
                        type: 'success'
                    })
                    this.loading = false
                }, 1000)
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.calm-opear-container {
    justify-content: center;
}
</style>
