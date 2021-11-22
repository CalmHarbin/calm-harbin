<template>
    <biu-form
        v-model="form"
        :source="source"
        label-position="right"
        :resize="false"
    ></biu-form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { BiuformType } from 'calm-harbin/types/biu-form'

@Component
export default class BiuFormResize extends Vue {
    form: any = {}

    loading = false

    get source(): BiuformType[] {
        return [
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
                id: 'remark',
                label: '备注',
                type: 'textarea',
                span: 24
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
