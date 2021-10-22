<template>
    <biu-form
        v-model="form"
        :source="source"
        label-suffix="："
        label-width="92px"
        label-position="right"
    ></biu-form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { BiuformType } from 'calm-harbin/types/biu-form'

@Component
export default class BiuFormElement extends Vue {
    form: any = {
        sendArea: ['北京市', '北京市', '东城区']
    }

    loading = false

    get source(): BiuformType[] {
        return [
            {
                formType: 'input',
                id: 'sendPerson',
                label: '发货人',
                disabled: true // 禁用
            },
            {
                formType: 'input',
                id: 'sendPhone',
                label: '发货人电话'
            },
            {
                formType: 'area',
                id: 'sendArea',
                label: '发货地区',
                clearable: false // 不允许删除
            },
            {
                formType: 'input',
                id: 'sendAddress',
                label: '详细地址',
                span: 24
            },
            {
                formType: 'input',
                id: 'remark',
                label: '备注',
                span: 24,
                type: 'textarea',
                autosize: true // 自适应高度
            }
        ]
    }
}
</script>

<style lang="scss" scoped>
.calm-opear-container {
    justify-content: center;
}
</style>
