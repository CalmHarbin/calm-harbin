<template>
    <biu-form
        v-model="form"
        :source="source"
        label-width="92px"
        label-position="right"
    >
        <template v-slot:sendArea="{ col }">
            <el-form-item :label="col.label" :prop="col.id">
                <div>{{ form[col.id] }}</div>
            </el-form-item>
        </template>
    </biu-form>
</template>

<script lang="tsx">
import { Vue, Component } from 'vue-property-decorator'
import { BiuformType } from 'calm-harin/types/biu-form'

@Component
export default class BiuFormSlot extends Vue {
    form: any = {
        sendPerson: '我是使用render自定义渲染的',
        sendArea: '我是使用slot自定义渲染的，优先级比render高'
    }

    loading = false

    get source(): BiuformType[] {
        return [
            {
                formType: 'slot',
                id: 'sendPerson',
                label: '发货人',
                render: (h, col) => (
                    <el-form-item
                        label={col.label}
                        label-width="92px"
                        prop={col.id}
                    >
                        <div>{this.form[col.id]}</div>
                    </el-form-item>
                )
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
