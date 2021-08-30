<template>
    <biu-form
        v-model="form"
        :source="source"
        label-position="right"
        direction="vertical"
    ></biu-form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { BiuformType } from 'calm-harin/types/biu-form'

@Component
export default class BiuFormDirection extends Vue {
    form: any = {}

    loading = false

    get source(): BiuformType[] {
        return [
            {
                formType: 'input',
                id: 'sendPerson',
                label: '发货人',
                span: 12
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
                label: '详细地址',
                span: 24
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
}
</script>

<style lang="scss" scoped>
.calm-opear-container {
    justify-content: center;
}
</style>
